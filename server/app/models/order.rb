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
#  shipper_id     :bigint
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
  include AASM

  has_many :order_items, -> { joins(:product).where("products.quantity > 0 AND products.is_display = true AND order_items.quantity > 0") }, dependent: :destroy
  accepts_nested_attributes_for :order_items

  has_many :order_histories, dependent: :destroy

  belongs_to :address, optional: true

  belongs_to :user
  belongs_to :seller, class_name: "User"
  belongs_to :shipper, class_name: "User", optional: true

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

  aasm column: :status, enum: true, no_direct_assignment: true, requires_new_transaction: false do
    state :shopping, initial: true

    state :wait_for_confirmation, :waiting_for_the_goods, :being_transported,
          :delivered, :canceled, :returns

    before_all_events :create_order_history
    after_all_events :update_order_history

    event :submit do
      transitions from: :shopping, to: :wait_for_confirmation
    end

    event :confirm do
      transitions from: :wait_for_confirmation, to: :waiting_for_the_goods, guard: :check_seller?
    end

    event :being_transported do
      transitions from: :waiting_for_the_goods, to: :being_transported, guard: :check_transported?
    end

    event :delivered, after_commit: :update_product_sold do
      transitions from: :being_transported, to: :delivered, guard: :check_all?
    end

    event :canceled do
      transitions from: [:wait_for_confirmation, :waiting_for_the_goods], to: :canceled, guard: :check_cancel_1_2?, after: :update_product_total_cancel_and_quantity
      transitions from:  :being_transported, to: :canceled, guard: :check_seller?, after: :update_product_total_return
      transitions from:  :being_transported, to: :canceled, guard: :check_shipper?, after: :update_product_total_return
    end

    event :returns do
      transitions form: :delivered, to: :returns
    end
  end

  def check_seller?
    return  Current.user.instance_of?(Admin) || Current.user.id == seller_id
  end

  def check_transported?
    return  Current.user.instance_of?(Admin) || Current.user.id == seller_id || Current.user.id == shipper_id
  end

  def check_all?
    return  Current.user.instance_of?(Admin) || Current.user.id == seller_id || Current.user.id == shipper_id || Current.user.id == user_id
  end

  def check_shipper?
    return  Current.user == shipper
  end

  def check_cancel_1_2?
    return false if Current.user == user && status.to_sym != :wait_for_confirmation
    return true if Current.user.instance_of?(Admin) || Current.user.id == seller_id || Current.user.id == user_id
  end

  def create_order_history
    return if status.to_sym == :shopping

    order_histories.find_or_create_by!(order_status_before: status, executor: Current.user, user_type: user_type)
  end

  def update_order_history
    return if status.to_sym == :wait_for_confirmation

    order_histories.last.update!(order_status_after: status)
  end

  def user_type
    if Current.user == user
      :buyer
    elsif Current.user == seller
      :seller
    elsif Current.user.instance_of?(Admin)
      :admin
    else
      :shipper
    end
  end

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

  def update_product_sold
    order_items.each do |order_item|
      product = order_item.product

      product.increment(:number_of_items_sold, order_item.quantity).save!
    end
  end

  def update_product_total_return
    order_items.each do |order_item|
      product = order_item.product

      product.increment(:total_cancel, order_item.quantity).save!
      product.increment(:total_return, order_item.quantity).save!
    end
  end

  def update_product_total_cancel_and_quantity
    order_items.each do |order_item|
      product = order_item.product

      product.increment(:total_cancel, order_item.quantity).save!
      product.increment(:quantity, order_item.quantity).save!
    end
  end
end
