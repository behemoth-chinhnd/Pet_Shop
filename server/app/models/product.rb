# == Schema Information
#
# Table name: products
#
#  id                 :bigint           not null, primary key
#  creator_type       :string(255)
#  lock_version       :integer
#  master_list_price  :integer
#  master_sales_price :integer
#  master_sku         :string(255)
#  name               :string(255)      not null
#  number             :string(255)      not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  creator_id         :bigint
#
# Indexes
#
#  index_products_on_name_creator_id_creator_type    (name,creator_id,creator_type) UNIQUE
#  index_products_on_number_creator_id_creator_type  (number,creator_id,creator_type) UNIQUE
#
class Product < ApplicationRecord
  belongs_to :creator, polymorphic: true, foreign_type: "creator_type", inverse_of: :products
end
