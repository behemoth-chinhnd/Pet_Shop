module Orders
  class AddProductsToCartService
    include Interactor

    # @params: [[CartItem]] cart_items
    # @params: [Customer] customer
    # @return: message

    def call
      product = Product.show.find_by(id: context.product_id)
      context.fail!(message: "Not found product") if product.blank?

      context.current_order = context.user.orders.find_or_create_by!(status: :shopping, seller_id: product.creator.id)

      ActiveRecord::Base.transaction do
        order_item = context.current_order.order_items.find_or_create_by!(product_id: context.product_id)

        context.fail!(message: "Not enough product #{product.name} quantity ") if product.quantity < context.quantity

        order_item.increment(:quantity, context.quantity).save!

        context.current_order.update_price!
      end
    end
  end
end
