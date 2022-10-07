module Api
  class OrdersController < ApplicationController
    before_action :set_user, if: :auth?
    before_action :find_order, only: [:show, :destroy]

    def show
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    end

    def index
      order = @user.orders.where.not(status: :shopping).order(id: :desc).ransack(params[:q]).result

      @pagy, @order = pagy(order, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@order, { adapter: :json,
                              each_serializer: ::Orders::ListSerializer })
    end

    def create
      service = ::Orders::CreateService.call(user: @user, **order_params.to_h)

      if service.success?
        response_success(service.order, { serializer: ::Orders::ShowSerializer })
      else
        response_error(service.message)
      end
    end

    def submit
      service = ::Orders::SubmitService.call(**order_params.to_h)

      if service.success?
        response_success(service.order, { serializer: ::Orders::ShowSerializer })
      else
        response_error(service.message)
      end
    end

    def destroy
      if @order.destroy
        response_success(@order)
      else
        response_error(@order.errors.to_hash(true))
      end
    end

    private

    def find_order
      @order = ::Order.includes(order_items: [:product]).
        where.not(status: :shopping).
        where(user_id: @user.id, number: params[:number]).first
    end

    def order_params
      params.require(:order).permit(:customer_address_id,
                                    address_attribute: [:city, :county, :street, :apartment_number, :description, :is_default, :name, :phone],
                                    products_data: [:product_id, :quantity])
    end

    def set_user
      @user = Current.user
    end

    def auth?
      authenticate!(:customer)
    end
  end
end
