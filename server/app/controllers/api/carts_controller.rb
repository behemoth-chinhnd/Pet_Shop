module Api
  class CartsController < ApplicationController
    before_action :set_user, if: :auth?

    def show
      @orders = @user.orders.shopping
      order_group_by_seller = @orders.group_by(&:seller_id)

      result = {
        data: [],
        infos: {
          discount: 0,
          number_of_items: 0,
          shipping_fee: 0,
          subtotal: 0,
          total: 0,
          total_quantity: 0,
        },
      }

      order_group_by_seller.each do |seller_id, orders|
        next if orders.last.order_items.blank?

        result[:data].push(
          seller: ::Users::ShowSerializer.new(User.find(seller_id)),
          orders: orders.map { |o| ::Orders::ShowSerializer.new(o) },
        )

        orders.each do |order|
          result[:infos][:discount] += order.discount
          result[:infos][:number_of_items] += order.number_of_items
          result[:infos][:shipping_fee] += order.shipping_fee
          result[:infos][:subtotal] += order.subtotal
          result[:infos][:total] += order.total
          result[:infos][:total_quantity] += order.total_quantity
        end
      end

      response_success(result)
    end

    def add_product
      service = ::Orders::AddProductsToCartService.call(user: @user, **cart_params.to_h)

      if service.success?
        response_success(service.current_order, { serializer: ::Orders::CartShowSerializer })
      else
        response_error(service.message)
      end
    end

    def remove_product
      service = ::Orders::RemoveProductsToCartService.call(**cart_params.to_h)

      if service.success?
        response_success(service.current_order, { serializer: ::Orders::CartShowSerializer })
      else
        response_error(service.message)
      end
    end

    private

    def cart_params
      params.require(:cart).permit(:product_id, :quantity)
    end

    def set_user
      @user = Current.user
    end

    def auth?
      authenticate!(:customer)
    end
  end
end
