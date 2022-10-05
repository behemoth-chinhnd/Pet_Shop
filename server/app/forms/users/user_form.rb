module Users
  class UserForm < BaseForm
    attribute :email, :string
    attribute :password, :string
    attribute :is_active, :boolean
    attribute :name, :string
    attribute :user_type, :string
    attribute :phone, :string
    attribute :address, :string
    attribute :birthday, :date
    attribute :sex_id, :integer

    validates :email,
              :password,
              :name,
              :birthday,
              :sex_id,
              presence: true

    with_options if: -> { email.present? } do
      validates :email, length: { maximum: MAX_STRING }
      validates :email, email_format: true
      validates :email, uniq: { klass: User }
    end

    with_options if: -> { name.present? } do
      validates :name, length: { maximum: MAX_STRING }
      validates :name, uniq: { klass: User }
    end

    validates :password, length: { minimum: 6, maximum: MAX_STRING }, if: -> { password.present? }

    validate :validate_sex, if: -> { sex_id.present? }

    def save
      return unless super

      @model.assign_attributes(attributes)
      @model.save
    end

    private

    def validate_sex
      errors.add(:sex_id, :invalid) unless Sex.all.pluck(:id).include?(sex_id)
    end
  end
end
