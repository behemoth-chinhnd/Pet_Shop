# == Schema Information
#
# Table name: order_items
#
#  id          :bigint           not null, primary key
#  description :string(255)
#  quantity    :integer
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

  after_create :increase_sold_product
  before_destroy :reduced_sole_product

  private

  def increase_sold_product
    product.increment!(:number_of_items_sold, quantity)
  end

  def reduced_sole_product
    product.decrement!(:number_of_items_sold, quantity)
  end
end
