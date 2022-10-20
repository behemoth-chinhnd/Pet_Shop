# == Schema Information
#
# Table name: order_items
#
#  id          :bigint           not null, primary key
#  description :string(255)
#  quantity    :integer
#  total       :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  order_id    :bigint
#  product_id  :bigint
#
# Indexes
#
#  index_order_items_on_order_id    (order_id)
#  index_order_items_on_product_id  (product_id)
#
class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  before_save :calculate_total

  def calculate_total
    self.total = quantity * product.master_sales_price
  end
end
