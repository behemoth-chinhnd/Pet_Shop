module Admins
  class TrademarkForm < BaseForm
    attribute :name, :string
    attribute :description, :string
    attribute :image_key, :string
    attribute :category_id, :integer
    attribute :species_id, :integer

    validates :name, :category_id, :species_id, presence: true

    validates :category_id, inclusion: { in: Category.pluck(:id) }, if: -> { category_id.present? }

    validates :species_id, inclusion: { in: Species.pluck(:id) }, if: -> { species_id.present? }

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
