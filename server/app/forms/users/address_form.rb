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

    validate :validate_is_default_uniq, if: -> { is_default == true }

    def save
      return unless super

      @model.assign_attributes(attributes)
      @model.save
    end

    private

    def validate_is_default_uniq
      errors.add(:is_default, :taken) if ::Address.where.not(id: model.id).where(user_id: @model.user_id).exists?(is_default: true)
    end
  end
end
