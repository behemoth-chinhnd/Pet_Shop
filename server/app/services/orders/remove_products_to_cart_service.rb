module Orders
  class RemoveProductsToCartService
    include Interactor

    def call
      context.current_order = Current.user.orders.find_or_create_by!(status: :shopping)

      ActiveRecord::Base.transaction do
        order_item = context.current_order.order_items.find_by!(product_id: context.product_id)

        if context.quantity
          order_item.decrement(:quantity, context.quantity).save!

          order_item.destroy! if order_item.quantity <= 0
        else
          order_item.destroy!
        end

        context.current_order.update_price!
      end
      context.message = "Cart item remove success"
    rescue StandardError => e
      Rails.logger.error("remove from cart error, Customer: #{Current.user.id}, error: #{e.message}")
      context.fail!(message: e.message)
    end
  end
end
