module Orders
  class CreateService
    include Interactor

    def call
      context.customer = Current.user
      context.customer_addresss = context.customer.addresses

      ActiveRecord::Base.transaction do
        construct_order

        context.address = if context.customer_address_id
                            context.customer_addresss.find_by(id: context.customer_address_id)
                          else
                            construct_address
                          end

        context.fail!(message: "Create Order failed") unless context.order && context.address

        context.order.address_id = context.address.id

        context.order.just_initialized!

        update_product_sold

        context.order.update_price!
      end
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
      if context.address_attribute
        form = ::Users::AddressForm.new.assign_model(Current.user.addresses.new, context.address_attribute.to_h)

        context.fail!(message: form.error_messages) unless form.save
      else
        context.fail!(message: "Address not exist") if context.customer_addresss.blank?

        context.address = context.customer_addresss.find_by(is_default: true)

        context.address = context.customer_addresss.last if context.address.blank?
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
