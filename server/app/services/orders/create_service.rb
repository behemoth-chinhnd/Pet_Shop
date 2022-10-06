module Orders
  class CreateService
    include Interactor

    def call
      construct_order
      construct_address

      context.order.just_initialized!

      update_product_sold

      context.order.update_price!
    end

    private

    def construct_order_items
      context.products_data.map do |product_data|
        {
          product_id: product_data.dig(:product_id),
          quantity: product_data.dig(:quantity),
        }
      end
    end

    def construct_order
      context.order = ::Order.new(
        user_id: context.user.id,
        order_items_attributes: construct_order_items,
        ordered_at: Time.current,
      )
    end

    def construct_address
      context.customer_addresss = Current.user.addresses

      if context.address_attribute
        form = ::Users::AddressForm.new.assign_model(Current.user.addresses.new, context.address_attribute.to_h)

        context.fail!(message: form.error_messages) unless form.save
      else
        context.fail!(message: "Address not exist") if context.customer_addresss.blank?

        context.address = context.customer_addresss.find_by(is_default: true)

        context.address = context.customer_addresss.last if context.address.blank?

        context.order.address_id = context.address.id
      end
    end

    def update_product_sold
      context.order.order_items.reload.each do |order_item|
        product = order_item.product
 
        context.fail!(message: "Not enough product #{product.name} quantity ") if product.quantity < order_item.quantity

        product.increment(:number_of_items_sold, order_item.quantity).save!
        product.decrement(:quantity, order_item.quantity).save!
      end
    end
  end
end
