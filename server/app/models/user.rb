# == Schema Information
#
# Table name: users
#
#  id                                      :bigint           not null, primary key
#  address                                 :string(255)
#  birthday                                :date
#  deleted_at                              :datetime
#  email                                   :string(255)      not null
#  email_verification_token                :string(255)
#  email_verification_token_valid_datetime :datetime
#  email_verified_at                       :datetime
#  encrypted_password                      :string(255)      not null
#  is_active                               :boolean          default(FALSE), not null
#  is_logout                               :boolean          default(FALSE), not null
#  lock_version                            :integer          default(0), not null
#  name                                    :string(255)      not null
#  password_reset_token                    :string(255)
#  password_reset_token_valid_datetime     :datetime
#  phone                                   :string(255)
#  point                                   :integer          default(0)
#  shipping_fee                            :bigint           default(0), not null
#  store_name                              :string(255)
#  user_type                               :integer          default("seller")
#  created_at                              :datetime         not null
#  updated_at                              :datetime         not null
#  sex_id                                  :integer
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  devise :database_authenticatable

  has_many :products, foreign_key: "creator_id", foreign_type: "creator_type", as: :products, dependent: :destroy

  has_many :order_histories, foreign_key: "executor_id", foreign_type: "executor_type", as: :order_histories, dependent: :destroy

  has_many :orders, dependent: :destroy

  has_many :addresses, dependent: :destroy

  has_one_attached :avatar

  enum user_type: {
    buyer: 0,
    seller: 1,
    shipper: 2,
  }

  def jwt_payload
    {
      sub: id,
      type: "user",
    }
  end

  def avatar_url
    return nil if avatar.blank?

    if ENV["GOOGLE_CLOUD_BUCKET"].present?
      avatar.url
    else
      Rails.application.routes.url_helpers.url_for(avatar)
    end
  end

  def avatar_key
    return nil if avatar.blank?

    avatar.key
  end
end
