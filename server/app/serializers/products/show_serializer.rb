module Products
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :name,
               :quantity,
               :creator_type,
               :number_of_items_sold,
               :master_list_price,
               :master_sales_price,
               :master_sku,
               :image_url,
               :is_display,
               :total_cancel,
               :total_return,
               :created_at,
               :updated_at

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
