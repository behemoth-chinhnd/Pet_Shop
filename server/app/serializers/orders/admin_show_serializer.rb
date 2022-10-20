module Orders
  class AdminShowSerializer < ActiveModel::Serializer
    attributes :id,
               :number,
               :total,
               :shipping_fee,
               :subtotal,
               :discount,
               :number_of_items,
               :total_quantity,
               :status

    def number_of_items
      object.number_of_items
    end

    def total_quantity
      object.total_quantity
    end

    has_many :all_order_items

    belongs_to :address

    class AddressSerializer < Addresses::ListSerializer
    end

    class OrderItemSerializer < ActiveModel::Serializer
      attributes :quantity, :total

      belongs_to :product

      class ProductSerializer < Products::ListSerializer
      end
    end
  end
end
