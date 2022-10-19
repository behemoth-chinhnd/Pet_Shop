module Orders
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount,
               :number_of_items,
               :total_quantity

    def number_of_items
      object.order_items.count
    end

    def total_quantity
      object.order_items.map(&:quantity).sum
    end

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
