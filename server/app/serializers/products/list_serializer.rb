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
  end
end
