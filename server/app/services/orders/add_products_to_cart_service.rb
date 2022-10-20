module Orders
  class AddProductsToCartService
    include Interactor

    # @params: [[CartItem]] cart_items
    # @params: [Customer] customer
    # @return: message

    def call
      product = Product.show.find_by(id: context.product_id)
      context.fail!(message: "Not found product") if product.blank?

      context.current_order = context.user.orders.find_by(status: :shopping, seller_id: product.creator.id)

      context.current_order = context.user.orders.create(seller_id: product.creator.id) if  context.current_order.blank?

      ActiveRecord::Base.transaction do
        order_item = OrderItem.find_by(product_id: context.product_id, order_id: context.current_order.id)

        order_item.increment(:quantity, context.quantity).save! if order_item.present?

        order_item = context.current_order.order_items.create!(product_id: context.product_id, quantity: context.quantity) if order_item.blank?

        context.fail!(message: "Not enough product #{product.name} quantity ") if product.quantity < order_item.quantity

        context.current_order.update_price!
      end
    end
  end
end
