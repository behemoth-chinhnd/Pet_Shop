# == Schema Information
#
# Table name: trademarks
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  description :string(255)
#  name        :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  species_id  :bigint           not null
#
# Indexes
#
#  index_species_on_name  (name)
#
class Trademark < ApplicationRecord
  has_many :products, dependent: :nullify

  belongs_to :species
  belongs_to :category

  has_one_attached :image

  def image_url
    return nil if image.blank?

    if ENV["GOOGLE_CLOUD_BUCKET"].present?
      image.url
    else
      Rails.application.routes.url_helpers.url_for(image)
    end
  end

  def image_key
    return nil if image.blank?

    image.key
  end
end
