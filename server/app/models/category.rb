# == Schema Information
#
# Table name: categories
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  description :string(255)
#  name        :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_category_on_name  (name) UNIQUE
#
class Category < ApplicationRecord
  has_many :trademarks, dependent: :destroy

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
