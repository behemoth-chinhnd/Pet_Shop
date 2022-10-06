module Users
  class AddressForm < BaseForm
    attribute :city, :string
    attribute :apartment_number, :string
    attribute :county, :string
    attribute :street, :string
    attribute :description, :string
    attribute :is_default, :boolean
    attribute :name, :string
    attribute :phone, :string

    validates :city, :county, :street, :phone, :name, presence: true

    def save
      return unless super

      @model.assign_attributes(attributes)
      @model.save
    end
  end
end
