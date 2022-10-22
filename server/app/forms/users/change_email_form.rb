module Users
  class ChangeEmailForm < BaseForm
    include CheckPasswordValidateConcern

    attribute :email, :string

    validates :email, presence: true

    with_options if: -> { email.present? } do
      validates :email, length: { maximum: MAX_STRING }
      validates :email, email_format: true
      validates :email, uniq: { klass: User }
    end

    def save
      return unless super

      @model.assign_attributes(attributes.except("password"))
      @model.save
    end
  end
end
