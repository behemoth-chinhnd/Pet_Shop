module Api
  class OrderHistoriesController < ApplicationController
    before_action :auth?
    before_action :set_user
    before_action :find_order_histories

    def show
      response_success(@order_histories)
    end

    private

    def find_order_histories
      order = Order.where("(user_id = ? OR seller_id = ?) AND number = ?", @user.id, @user.id, params[:number])

      if order.blank?
        response_error("Order not found")
      else
        @order_histories = order.last.order_histories
      end
    end

    def set_user
      @user = Current.user
    end

    def error_message
      response_error(error: :error)
    end

    def auth?
      authenticate!(:customer)
    end
  end
end
