module Orders
  class AddProductsToCartService
    include Interactor

    # @params: [[CartItem]] cart_items
    # @params: [Customer] customer
    # @return: message

    def call
      context.current_order = context.user.orders.find_or_create_by!(status: :shopping)

      order_item = context.current_order.order_items.find_or_create_by!(product_id: context.product_id)
      product = order_item.product

      context.fail!(message: "Not enough product #{product.name} quantity ") if product.quantity < order_item.quantity

      order_item.increment(:quantity, context.quantity).save!

      context.current_order.update_price!
    end
  end
end
