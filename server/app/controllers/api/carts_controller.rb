module Api
  class CartsController < ApplicationController
    before_action :set_user, if: :auth?
    before_action :find_order, except: [:show, :add_product]

    def show
      @orders = @user.orders.shopping
      order_group_by_seller = @orders.group_by { |o| o.seller_id }

      result = {}

      order_group_by_seller.each do |seller_id, orders|
        result[seller_id] ||= {}

        result[seller_id][:seller] = ::Users::ShowSerializer.new(User.find(seller_id))
        result[seller_id][:orders] = orders.map { |o| ::Orders::ShowSerializer.new(o) }
      end      

      response_success(result)
      # response_success(@orders.map { |k, v| ::Orders::ShowSerializer.new(v)} )

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

    def find_order
      @order = ::Order.includes(order_items: [:product]).where(user_id: @user.id).find_or_create_by!(status: :shopping)
    end

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
