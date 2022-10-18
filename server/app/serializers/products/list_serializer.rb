module Products
  class ListSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :name,
               :number_of_items_sold,
               :quantity,
               :master_list_price,
               :master_sales_price,
               :master_sku,
               :is_display,
               :image_url

    belongs_to :creator
    belongs_to :trademark

    class UserSerializer < ActiveModel::Serializer
      attributes :id, :email, :name
    end

    class TrademarkSerializer < Trademarks::ShowSerializer
    end

    class AdminSerializer < ActiveModel::Serializer
      attributes :id, :email, :name
    end
  end
end
