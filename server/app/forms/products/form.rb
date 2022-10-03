module Products
  class Form < BaseForm
    attribute :master_list_price, :integer
    attribute :master_sales_price, :integer
    attribute :master_sku, :string
    attribute :name, :string
    attribute :number, :string

    validates :name, :number, :master_sku,
              :master_list_price, :master_sales_price,
              presence: true

    validates :number, uniq: { klass: Product }
    validates :name, uniq: { klass: Product }

    def save
      return unless super

      @model.assign_attributes(attributes)
      @model.save
    end
  end
end
