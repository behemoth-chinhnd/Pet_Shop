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
#  user_type                               :integer          default(1)
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

  def jwt_payload
    {
      sub: id,
      type: "user",
    }
  end
end
