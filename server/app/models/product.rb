# == Schema Information
#
# Table name: products
#
#  id                   :bigint           not null, primary key
#  creator_type         :string(255)
#  description          :string(255)
#  is_display           :boolean          default(TRUE), not null
#  lock_version         :integer
#  master_list_price    :integer
#  master_sales_price   :integer
#  master_sku           :string(255)
#  name                 :string(255)      not null
#  number               :string(255)      not null
#  number_of_items_sold :bigint           default(0), not null
#  quantity             :integer          default(0), not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  creator_id           :bigint
#
# Indexes
#
#  index_products_on_name_creator_id_creator_type    (name,creator_id,creator_type) UNIQUE
#  index_products_on_number_creator_id_creator_type  (number,creator_id,creator_type) UNIQUE
#
class Product < ApplicationRecord
  has_many :product_categories, dependent: :destroy

  has_many :order_items, dependent: :destroy

  belongs_to :creator, polymorphic: true, foreign_type: "creator_type", inverse_of: :products

  has_one_attached :image

  scope :show, -> { where("is_display = true AND quantity > 0") }

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
