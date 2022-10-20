module Api
  module Admins
    class OrdersController < ApplicationController
      before_action :auth?
      before_action :set_user
      # before_action :find_order

      # def show
      #   response_success(@order)
      # end

      def index
        order = Order.includes(:seller, :user, :address, all_order_items: [product: [:creator, :image_blob, trademark: [:image_blob, :category, :species]]]).order(id: :desc).ransack(params[:q]).result

        @pagy, @order = pagy(order, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

        response_list(@order, { adapter: :json,
                                each_serializer: ::Orders::AdminShowSerializer })
      end

      # def destroy
      #   if @order.destroy
      #     response_success(@order)
      #   else
      #     response_error(@order.errors.to_hash(true))
      #   end
      # end

      private

      # def find_order
      #   @order = Order.find_by(number: params[:number])
      # end

      def set_user
        @admin = Current.user
      end

      def auth?
        authenticate!(:admin)
      end
    end
  end
end
