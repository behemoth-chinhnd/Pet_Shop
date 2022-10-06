module Api
  class CartsController < ApplicationController
    before_action :set_user, if: :auth?
    before_action :find_order

    def show
      response_success(@order, { serializer: ::Orders::CartShowSerializer })
    end

    def add_product
      service = ::Orders::AddProductsToCartService.call(user: @user, **cart_params.to_h)

      if service.success?
        response_success(message: "Add To Cart Success")
      else
        response_error(service.message)
      end
    end

    def remove_product
      service = ::Orders::RemoveProductsToCartService.call(**cart_params.to_h)
      if service.success?
        response_success(service.message)
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
