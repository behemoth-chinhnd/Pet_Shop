# == Schema Information
#
# Table name: order_histories
#
#  id                  :bigint           not null, primary key
#  deleted_at          :datetime
#  description         :string(255)
#  executor_type       :string(255)
#  order_status_after  :string(255)
#  order_status_before :string(255)
#  user_type           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  executor_id         :bigint
#  order_id            :bigint
#
# Indexes
#
#  index_order_histories_on_order_id_executor_id_executor_type  (order_id,executor_id,executor_type)
#
class OrderHistory < ApplicationRecord
  belongs_to :order

  belongs_to :executor, polymorphic: true, foreign_type: "executor_type", inverse_of: :order_histories

  enum user_type: {
    buyer: 0,
    seller: 1,
    shipper: 2,
    admin: 3,
  }
end
