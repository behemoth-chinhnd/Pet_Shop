module Orders
  class SubmitService
    include Interactor

    def call
      context.customer = Current.user
      context.customer_addresss = context.customer.addresses

      ActiveRecord::Base.transaction do
        context.order = context.customer.orders.shopping.last

        context.address = if context.customer_address_id
                            context.customer_addresss.find_by(id: context.customer_address_id)
                          else
                            construct_address
                          end

        context.fail!(message: "Submit Order failed") unless context.order && context.address && context.order.order_items

        context.order.update!(
          status: :just_initialized,
          ordered_at: Time.current,
          address_id: context.address.id,
        )

        context.order.update_price!
        update_product_sold
      end
    end

    private

    def construct_address
      if context.address_attribute
        context.address = ::Users::AddressForm.new.assign_model(context.customer.addresses.new, context.address_attribute.to_h)

        context.fail!(message: form.error_messages) unless context.address.save
      else
        context.fail!(message: "User not exist address") if context.customer_addresss.blank?

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
