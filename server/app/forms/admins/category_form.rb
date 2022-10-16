module Admins
  class CategoryForm < BaseForm
    attribute :name, :string
    attribute :description, :string
    attribute :image_key, :string

    validates :name, presence: true

    validates :name, uniq: { klass: Category }, if: -> { name.present? }

    validate :validate_image_not_found, if: -> { image_key.present? }

    def save
      return unless super

      ActiveRecord::Base.transaction do
        @model.image.attach(@blob) if image_key.present?

        @model.assign_attributes(attributes.except("image_key"))
        @model.save!
        true
      end
    rescue StandardError => e
      errors.add(:base, e.message)
      return false
    end

    private

    def validate_image_not_found
      @blob = ActiveStorage::Blob.find_by(key: image_key)

      errors.add(:image_key, :not_found) if @blob.blank?
    end
  end
end
