module CheckPasswordValidateConcern
  extend ActiveSupport::Concern

  included do
    attribute :password, :string

    validates :password, presence: true

    with_options if: -> { password.present? } do
      validates :password, length: { minimum: 6, maximum: 255 }
      validate :validate_check_password
    end

    private

    def validate_check_password
      errors.add(:password, :invalid) unless @model.valid_password?(password)
    end
  end
end
