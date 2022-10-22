module Users
  class ChangePasswordForm < BaseForm
    include CheckPasswordValidateConcern

    attribute :new_password, :string
    attribute :new_password_confirmation, :string

    validates :new_password_confirmation,
              :new_password,
              presence: true

    with_options if: -> { new_password.present? } do
      validates :new_password, length: { minimum: 6, maximum: MAX_STRING }
      validates :new_password, confirmation: true, if: -> { new_password_confirmation.present? }
      validate :check_new_password
    end

    def save
      return unless super

      @model.assign_attributes(password: new_password)
      @model.save
    end

    private

    def check_new_password
      errors.add(:new_password,
                 :duplicated_password) if @model.valid_password?(new_password)
    end
  end
end
