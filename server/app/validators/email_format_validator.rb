class EmailFormatValidator < ActiveModel::EachValidator
  EMAIL_FORMAT = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i.freeze

  def validate_each(record, attribute, value)
    record.errors.add(attribute, :invalid) unless value =~ EMAIL_FORMAT
  end
end
