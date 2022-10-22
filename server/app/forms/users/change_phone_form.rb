module Users
  class ChangePhoneForm < BaseForm
    include CheckPasswordValidateConcern

    attribute :phone, :string

    validates :phone, presence: true

    validates :phone, uniq: { klass: User },
                      length: { minimum: 3, maximum: 12 },
                      numericality: { only_integer: true }, if: -> { phone.present? }

    def save
      return unless super

      @model.assign_attributes(attributes.except("password"))
      @model.save
    end
  end
end
