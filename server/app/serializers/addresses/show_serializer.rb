module Addresses
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :name,
               :creator_type,
               :master_list_price,
               :master_sales_price,
               :master_sku,
               :created_at,
               :updated_at

    belongs_to :user

    has_many :orders

    class UserSerializer < ActiveModel::Serializer
      attributes :id, :email, :name
    end

    class OrderSerializer < ActiveModel::Serializer
      attributes :id, :number, :name
    end
  end
end
