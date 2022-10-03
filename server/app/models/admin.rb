# == Schema Information
#
# Table name: admins
#
#  id                 :bigint           not null, primary key
#  deleted_at         :datetime
#  email              :string(255)      not null
#  encrypted_password :string(255)      not null
#  is_logout          :boolean          default(FALSE), not null
#  lock_version       :integer          default(0), not null
#  name               :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_admin_on_email  (email) UNIQUE
#
class Admin < ApplicationRecord
  devise :database_authenticatable

  has_many :products, foreign_key: "creator_id", foreign_type: "creator_type", as: :products, dependent: :destroy

  def jwt_payload
    {
      sub: id,
      type: "admin",
    }
  end
end
