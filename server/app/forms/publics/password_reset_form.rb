module Publics
  class PasswordResetForm < BaseForm
    attribute :password, :string
    attribute :password_confirmation, :string

    validates :password, :password_confirmation, presence: true

    validates :password, length: { minimum: 6, maximum: MAX_STRING }, if: -> { password.present? }
    validates :password, confirmation: true, if: -> {
      password.present? && password_confirmation.present?
    }

    def save
      return unless super

      @model.assign_attributes(
        attributes.merge(
          password_reset_token: nil,
          password_reset_token_valid_datetime: nil,
        ),
      )
      @model.save
    end
  end
end
