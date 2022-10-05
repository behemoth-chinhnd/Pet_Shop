# == Schema Information
#
# Table name: product_categories
#
#  id          :bigint           not null, primary key
#  deleted_at  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_pc_on_user_id_category_id  (user_id,category_id) UNIQUE
#
class ProductCategory < ApplicationRecord
end
