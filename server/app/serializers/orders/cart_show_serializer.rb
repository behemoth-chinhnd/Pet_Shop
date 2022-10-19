module Orders
  class CartShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount,
               :total_quantity,
               :total_items

    has_many :order_items

    def total_quantity
      object.order_items.sum(:quantity)
    end

    def total_items
      object.order_items.count
    end

    class OrderItemSerializer < ActiveModel::Serializer
      attributes :quantity, :total

      belongs_to :product

      class ProductSerializer < ::Products::ListSerializer
      end
    end
  end
end
