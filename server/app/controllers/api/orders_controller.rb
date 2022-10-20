module Api
  class OrdersController < ApplicationController
    before_action :set_user, if: :auth?
    before_action :find_my_order, only: [:show, :destroy]
    before_action :find_order, only: [:status_confirm, :status_transported, :status_delivered, :status_canceled]

    def show
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    end

    def index
      order = @user.orders.includes(order_items: [:product]).where.not(status: :shopping).order(id: :desc).ransack(params[:q]).result

      @pagy, @order = pagy(order, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@order, { adapter: :json,
                              each_serializer: ::Orders::ShowSerializer })
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
        response_success(service.list_order, { each_serializer: ::Orders::ShowSerializer })
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

    def status_confirm
      @order.confirm!
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    rescue StandardError, AASM::InvalidTransition => _e
      response_error("Change Status Failed")
    end

    def status_transported
      @order.being_transported!
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    rescue StandardError, AASM::InvalidTransition => _e
      response_error("Change Status Failed")
    end

    def status_delivered
      @order.delivered!
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    rescue StandardError, AASM::InvalidTransition => _e
      response_error("Change Status Failed")
    end

    def status_canceled
      @order.canceled!
      response_success(@order, { serializer: ::Orders::ShowSerializer })
    rescue StandardError, AASM::InvalidTransition => _e
      response_error("Change Status Failed")
    end

    private

    def find_my_order
      @order = ::Order.includes(order_items: [:product]).
        where.not(status: :shopping).
        where(user_id: @user.id, number: params[:number]).first

      response_error("Order not found") if @order.blank?
    end

    def find_order
      @order = ::Order.includes(order_items: [:product]).
        where.not(status: :shopping).
        where(number: params[:number]).first

      response_error("Order not found") if @order.blank?
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
