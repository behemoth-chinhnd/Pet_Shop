module Users
  class ChangeNameStoreForm < BaseForm
    include CheckPasswordValidateConcern

    attribute :store_name, :string
    attribute :shipping_fee, :integer

    validates :store_name, presence: true

    validates :store_name, uniq: { klass: User }, if: -> { store_name.present? }

    validates :shipping_fee, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: -> { shipping_fee.present? }

    def save
      return unless super

      @model.assign_attributes(attributes.except("password"))
      @model.save
    end
  end
end
