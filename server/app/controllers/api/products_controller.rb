module Api
  class ProductsController < ApplicationController
    before_action :set_user, if: :auth?, only: [:update, :destroy, :create]
    before_action :find_product, only: [:show]

    def show
      response_success(@product, { serializer: ::Products::ShowSerializer })
    end

    def index
      product = Product.includes(:creator).order(id: :desc).ransack(params[:q]).result

      @pagy, @product = pagy(product, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@product, { adapter: :json,
                                each_serializer: ::Products::ShowSerializer })
    end

    def create
      form = ::Products::Form.new.assign_model(Current.user.products.new, product_params.to_h)

      if form.save
        response_success(form.model, { serializer: ::Products::ShowSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def update
      product = @user.products.find(params[:id])

      form = ::Products::Form.new.assign_model(product, product_params.to_h)

      if form.save
        response_success(form.model, { serializer: ::Products::ShowSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def destroy
      product = @user.products.find(params[:id])

      if product.destroy
        response_success(product)
      else
        response_error(product.errors.to_hash(true))
      end
    end

    private

    def product_params
      product_params = params.require(:product).permit(:number,
                                                       :name,
                                                       :master_sku,
                                                       :master_list_price,
                                                       :master_sales_price)
    end

    def set_user
      @user = Current.user
    end

    def error_message
      response_error(error: :error)
    end

    def auth?
      authenticate!(:login)
    end

    def find_product
      @product = Product.find(params[:id])
    end
  end
end
