module Orders
  class CartShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount,
               :total_items

    has_many :order_items

    def total_items
      object.order_items.sum(:quantity)
    end

    class OrderItemSerializer < ActiveModel::Serializer
      attribute :quantity

      belongs_to :product

      class ProductSerializer < ::Products::ListSerializer
      end
    end
  end
end
