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
    attribute :avatar_key, :string
    attribute :shipping_fee, :integer
    attribute :store_name, :string

    with_options if: -> { @model.new_record? } do
      validates :email,
                :password,
                :name,
                :birthday,
                :sex_id,
                presence: true

      validates :password, length: { minimum: 6, maximum: MAX_STRING }, if: -> { password.present? }
    end

    with_options if: -> { email.present? } do
      validates :email, length: { maximum: MAX_STRING }
      validates :email, email_format: true
      validates :email, uniq: { klass: User }
    end

    validate :validate_sex, if: -> { sex_id.present? }

    validate :validate_avatar_not_found, if: -> { avatar_key.present? }

    validate :validate_store_name, if: -> { store_name.present? }

    def save
      return unless super

      ActiveRecord::Base.transaction do
        @model.avatar.attach(@blob) if avatar_key.present?

        @model.assign_attributes(attributes.except("avatar_key"))
        @model.save!
        true
      end
    rescue StandardError => e
      errors.add(:base, e.message)
      return false
    end

    private

    def validate_sex
      errors.add(:sex_id, :invalid) unless Sex.all.pluck(:id).include?(sex_id)
    end

    def validate_avatar_not_found
      @blob = ActiveStorage::Blob.find_by(key: avatar_key)

      errors.add(:avatar_key, :not_found) if @blob.blank?
    end

    def validate_store_name
      errors.add(:store_name, :invalid) unless ::User.exists?(store_name:)
    end
  end
end
