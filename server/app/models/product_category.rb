# == Schema Information
#
# Table name: product_categories
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  product_id  :bigint           not null
#
# Indexes
#
#  index_pc_on_product_id_category_id  (product_id,category_id) UNIQUE
#
class ProductCategory < ApplicationRecord
  belongs_to :product
  belongs_to :category
end
