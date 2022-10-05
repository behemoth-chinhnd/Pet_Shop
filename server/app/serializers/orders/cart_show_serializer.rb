module Orders
  class CartShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount

    has_many :order_items

    class OrderItemSerializer < ActiveModel::Serializer
      attribute :quantity

      belongs_to :product

      class ProductSerializer < ActiveModel::Serializer
        attribute :name
      end
    end
  end
end
