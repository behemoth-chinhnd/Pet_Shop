# == Schema Information
#
# Table name: addresses
#
#  id               :bigint           not null, primary key
#  apartment_number :string(255)
#  city             :string(255)
#  county           :string(255)
#  deleted_at       :datetime
#  description      :string(255)
#  is_default       :boolean          default(FALSE), not null
#  lock_version     :integer          not null
#  street           :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_adresses_on_user_id  (user_id)
#
class Address < ApplicationRecord
  belongs_to :user

  has_many :orders, dependent: :nullify
end
