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
#  trademark_id         :bigint
#
# Indexes
#
#  index_products_on_name_creator_id_creator_type    (name,creator_id,creator_type) UNIQUE
#  index_products_on_number_creator_id_creator_type  (number,creator_id,creator_type) UNIQUE
#
class Product < ApplicationRecord
  belongs_to :trademark, optional: true

  has_many :order_items, dependent: :destroy

  belongs_to :creator, polymorphic: true, foreign_type: "creator_type", inverse_of: :products

  has_one_attached :image

  after_update :update_cart_quantity

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

  def update_cart_quantity
    return unless order_items

    order_items.each do |order_item|
      if order_item.quantity > quantity && order_item.order.shopping?
        order_item.update!(quantity: quantity)
        order_item.order.update_price!
      end
    end
  end

  after_update :update_shopping_order_price

  def update_shopping_order_price
    order_ids = order_items.map(&:order_id).flatten

    Order.shopping.where(id: order_ids).each do |order|
      order.order_items.map(&:save)
      order.update_price!
    end
  end
end
