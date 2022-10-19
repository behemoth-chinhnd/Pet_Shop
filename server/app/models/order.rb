# == Schema Information
#
# Table name: orders
#
#  id             :bigint           not null, primary key
#  discount       :bigint           default(0), not null
#  number         :string(255)      not null
#  ordered_at     :datetime
#  payment_method :integer          default(0), not null
#  shipping_fee   :bigint           default(0), not null
#  status         :integer          default("shopping"), not null
#  subtotal       :bigint           default(0), not null
#  total          :bigint           default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  address_id     :bigint
#  seller_id      :bigint
#  user_id        :bigint           not null
#
# Indexes
#
#  index_orders_on_address_id  (address_id)
#  index_orders_on_ordered_at  (ordered_at)
#  index_orders_on_user_id     (user_id)
#
class Order < ApplicationRecord
  include RandomNumberGeneratorConcern

  has_many :order_items, -> { joins(:product).where("products.quantity > 0 AND products.is_display = true") }, dependent: :destroy
  accepts_nested_attributes_for :order_items

  belongs_to :address, optional: true

  belongs_to :user
  belongs_to :seller, class_name: "User"

  before_destroy :update_quantity_product

  enum status: {
    shopping: 0,
    wait_for_confirmation: 1,
    waiting_for_the_goods: 2,
    being_transported: 3,
    delivered: 4,
    canceled: 5,
    returns: 6,
  }

  def update_price!
    subtotal = calculate_total_price
    discount = calculate_discount
    shipping_fee = calculate_shipping_fee
    total = calculate_final_price(subtotal, discount, shipping_fee)

    update!(subtotal:, discount:, shipping_fee:, total:)
  end

  def number_of_items
    order_items.count
  end

  def total_quantity
    order_items.map(&:quantity).sum
  end

  private

  def calculate_final_price(subtotal, discount, shipping_fee)
    subtotal - discount + shipping_fee
  end

  def calculate_total_price
    sum = 0

    order_items.reload.each do |order_item|
      sum += order_item.total
    end

    sum
  end

  def calculate_discount
    0
  end

  def calculate_shipping_fee
    0
  end

  def update_quantity_product
    order_items.reload.each do |order_item|
      product = order_item.product

      product.decrement(:number_of_items_sold, order_item.quantity).save!
      product.increment(:quantity, order_item.quantity).save!
    end
  end
end
