module Products
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

    belongs_to :creator

    class UserSerializer < ActiveModel::Serializer
      attributes :id, :email, :name
    end

    class AdminSerializer < ActiveModel::Serializer
      attributes :id, :email, :name
    end
  end
end
