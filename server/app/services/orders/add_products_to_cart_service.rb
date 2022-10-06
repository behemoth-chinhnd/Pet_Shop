module Orders
  class AddProductsToCartService
    include Interactor

    # @params: [[CartItem]] cart_items
    # @params: [Customer] customer
    # @return: message

    def call
      context.current_order = context.user.orders.find_or_create_by!(status: :shopping)

      ActiveRecord::Base.transaction do
        add_item_to_cart!
      end
    rescue StandardError => e
      Rails.logger.error("Add to cart error, Customer: #{Current.user.id}, error: #{e.message}")
      context.fail!(message: "Add to cart failed")
    end

    private

    def add_item_to_cart!
      order_item = context.current_order.order_items.find_or_create_by!(product_id: context.product_id)

      order_item.increment(:quantity, context.quantity).save!

      context.current_order.update_price!
    end
  end
end