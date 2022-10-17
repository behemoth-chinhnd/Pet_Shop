module Orders
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount

    has_many :order_items

    belongs_to :address

    class AddressSerializer < Addresses::ListSerializer
    end

    class OrderItemSerializer < ActiveModel::Serializer
      attribute :quantity

      belongs_to :product

      class ProductSerializer < Products::ListSerializer
      end
    end
  end
end
