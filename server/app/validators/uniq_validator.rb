class UniqValidator < ActiveModel::EachValidator
  def initialize(options)
    super
    @klass = options[:klass] if options[:klass].present?
  end

  # rubocop:disable Metrics/CyclomaticComplexity
  # rubocop:disable Metrics/PerceivedComplexity
  def validate_each(record, attribute, value)
    if options[:klass].blank?
      raise ArgumentError, "Unknown validator: 'UniqValidator'"
    else
      record_org = record
      attribute_org = attribute

      record = if record_org.persisted?
                 record_org.model
               else
                 options[:klass].new
               end
      record_attr = { attribute => value }
      [options[:scope]].flatten.compact.each do |scope_attr|
        record_attr.merge!(scope_attr => record_org.try(:model).try(scope_attr) || record_org.try(scope_attr))
      end
      record.assign_attributes(record_attr)
      finder_class = find_finder_class_for(record)
      value = map_enum_attribute(finder_class, attribute, value)
      relation = build_relation(finder_class, attribute, value, options)

      if record.persisted?
        if finder_class.primary_key
          relation = relation.where.not(finder_class.primary_key => record.id_in_database)
        else
          raise UnknownPrimaryKey.new(finder_class, "Cannot validate uniqueness for persisted record without primary key.")
        end
      end

      relation = scope_relation(record, record_org, relation)

      if options[:conditions]
        conditions = options[:conditions]

        relation = if conditions.arity.zero?
                     relation.instance_exec(&conditions)
                   else
                     relation.instance_exec(record, &conditions)
                   end
      end

      if relation.exists?
        error_options = options.except(:case_sensitive, :scope, :conditions)
        error_options[:value] = value

        record.errors.add(attribute, :taken, **error_options)
        record_org.errors.add(attribute_org, :taken, **error_options)
      end
    end
  end
  # rubocop:enable Metrics/CyclomaticComplexity
  # rubocop:enable Metrics/PerceivedComplexity

  private

  # The check for an existing value should be run from a class that
  # isn't abstract. This means working down from the current class
  # (self), to the first non-abstract class. Since classes don't know
  # their subclasses, we have to build the hierarchy between self and
  # the record's class.
  def find_finder_class_for(record)
    class_hierarchy = [record.class]

    while class_hierarchy.first != @klass
      class_hierarchy.unshift(class_hierarchy.first.superclass)
    end

    class_hierarchy.detect { |klass| !klass.abstract_class? }
  end

  def build_relation(klass, attribute, value, options = {})
    relation = options[:remove_unscoped] ? klass.all : klass.unscoped

    comparison = relation.bind_attribute(attribute, value) do |attr, bind|
      return relation.none! if bind.unboundable?

      if !options.key?(:case_sensitive) || bind.nil?
        klass.connection.default_uniqueness_comparison(attr, bind)
      elsif options[:case_sensitive]
        klass.connection.case_sensitive_comparison(attr, bind)
      else
        # will use SQL LOWER function before comparison, unless it detects a case insensitive collation
        klass.connection.case_insensitive_comparison(attr, bind)
      end
    end

    relation.where!(comparison)
  end

  def scope_relation(record, record_org, relation)
    Array(options[:scope_name]).each do |scope|
      relation = relation.public_send(scope)
    end

    Array(options[:scope]).each do |scope_item|
      scope_value = if record.class._reflect_on_association(scope_item)
                      record.association(scope_item).reader
                    else
                      record.read_attribute(scope_item)
                    end

      relation = relation.where.not(id: record_org.model.id) if record_org.model
      relation = relation.where(scope_item => scope_value)
    end

    relation
  end

  def map_enum_attribute(klass, attribute, value)
    mapping = klass.defined_enums[attribute.to_s]
    return value if mapping.blank?

    value = value && mapping && value.class.to_s === "Integer" ? mapping.key(value) : mapping[value]
    value
  end
end
