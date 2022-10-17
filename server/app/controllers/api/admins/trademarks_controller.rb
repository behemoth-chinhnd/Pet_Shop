module Api
  module Admins
    class TrademarksController < ApplicationController
      before_action :auth?, except: :index
      before_action :set_user
      before_action :find_trademark, only: [:show, :update, :destroy]

      def show
        response_success(@trademark, { serializer: ::Trademarks::ShowSerializer })
      end

      def index
        trademark = Trademark.includes(:image_blob).order(id: :desc).ransack(params[:q]).result
        @pagy, @trademark = pagy(trademark, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

        response_list(@trademark, { adapter: :json,
                                    each_serializer: ::Trademarks::ShowSerializer })
      end

      def create
        form = ::Admins::TrademarkForm.new.assign_model(Trademark.new, trademark_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Trademarks::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def update
        form = ::Admins::TrademarkForm.new.assign_model(@trademark, trademark_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Trademarks::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def destroy
        @trademark.destroy!
        response_success(@trademark)
      end

      private

      def trademark_params
        params.require(:trademark).permit(:name, :description, :category_id, :species_id).merge(params.permit(:image_key))
      end

      def find_trademark
        @trademark = Trademark.find(params[:id])
      end

      def set_user
        @user = Current.user
      end

      def error_message
        response_error(error: :error)
      end

      def auth?
        authenticate!(:admin)
      end
    end
  end
end
