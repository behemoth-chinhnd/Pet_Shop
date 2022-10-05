module Orders
  class RemoveProductsToCartService
    include Interactor

    def call
      current_order = Current.user.orders.find_or_create_by!(status: :shopping)

      ActiveRecord::Base.transaction do
        context.cart_items.each do |cart_item|
          order_item = current_order.order_items.find_by!(product_id: cart_item.dig(:product_id))

          if cart_item.dig(:quantity)
            order_item.decrement(:quantity, cart_item.dig(:quantity)).save!

            order_item.destroy! if order_item.quantity.zero?
          else
            order_item.destroy!
          end

          current_order.update_price!
        end
      end
        context.message =  "Cart item remove success"
    rescue StandardError => e
      Rails.logger.error("remove from cart error, Customer: #{Current.user.id}, error: #{e.message}")
      context.fail!(message: "Cart item remove failed")
    end
  end
end
