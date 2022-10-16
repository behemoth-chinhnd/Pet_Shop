module Api
  module Admins
    class CategoriesController < ApplicationController
      before_action :auth?, except: :index
      before_action :set_user
      before_action :find_category, only: [:show, :update, :destroy]

      def show
        response_success(@category, { serializer: ::Categories::ShowSerializer })
      end

      def index
        category = Category.includes(:image_blob).order(id: :desc).ransack(params[:q]).result
        @pagy, @category = pagy(category, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

        response_list(@category, { adapter: :json,
                                   each_serializer: ::Categories::ShowSerializer })
      end

      def create
        form = ::Admins::CategoryForm.new.assign_model(Category.new, category_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Categories::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def update
        form = ::Admins::CategoryForm.new.assign_model(@category, category_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Categories::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def destroy
        @category.destroy!
        response_success(@category)
      end

      private

      def category_params
        params.require(:category).permit(:name, :description).merge(params.permit(:image_key))
      end

      def find_category
        @category = Category.find(params[:id])
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
end
