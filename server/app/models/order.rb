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
#  tax            :bigint           default(0), not null
#  total          :bigint           default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  address_id     :bigint
#  user_id        :bigint           not null
#
# Indexes
#
#  index_orders_on_ordered_at  (ordered_at)
#  index_orders_on_user_id     (user_id)
#
class Order < ApplicationRecord
  include RandomNumberGeneratorConcern

  has_many :order_items, dependent: :destroy
  accepts_nested_attributes_for :order_items

  belongs_to :address

  belongs_to :user

  enum status: {
    shopping: 0,
    just_initialized: 1,
    ship: 2,
    complete: 3,
  }
end
