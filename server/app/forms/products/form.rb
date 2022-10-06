module Products
  class Form < BaseForm
    attribute :master_list_price, :integer
    attribute :master_sales_price, :integer
    attribute :master_sku, :string
    attribute :name, :string
    attribute :number, :string
    attribute :quantity, :integer

    validates :name, :number, :master_sku, :quantity,
              :master_list_price, :master_sales_price,
              presence: true

    validates :quantity, numericality: { greater_than_or_equal_to: 0, only_integer: true }

    validate :validate_uniq_name_with_creator, if: -> { name.present? }

    validate :validate_uniq_number_with_creator, if: -> { number.present? }

    def save
      return unless super

      @model.assign_attributes(attributes)
      @model.save
    end

    private

    def validate_uniq_name_with_creator
      errors.add(:name, :taken) if ::Product.where.not(id: model.id).where(creator_id: @model.creator_id, creator_type: @model.creator_type).exists?(name: name)
    end

    def validate_uniq_number_with_creator
      errors.add(:number, :taken) if ::Product.where.not(id: model.id).where(creator_id: @model.creator_id, creator_type: @model.creator_type).exists?(number: number)
    end
  end
end