module Api
  class AddressesController < ApplicationController
    before_action :set_user, if: :auth?
    before_action :find_address, only: [:show, :update, :destroy]

    def show
      response_success(@address, { serializer: ::Addresses::ListSerializer })
    end

    def index
      address = @user.addresses.order(id: :desc).ransack(params[:q]).result
      @pagy, @address = pagy(address, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@address, { adapter: :json,
                                each_serializer: ::Addresses::ListSerializer })
    end

    def create
      form = ::Users::AddressForm.new.assign_model(@user.addresses.new, address_params.to_h)

      if form.save
        response_success(form.model, { serializer: ::Addresses::ListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def update
      form = ::Users::AddressForm.new.assign_model(@address, address_params.to_h)

      if form.save
        response_success(form.model, { serializer: ::Addresses::ListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def destroy
      @address.destroy!
      response_success(@address)
    end

    private

    def address_params
      params.require(:address).permit(
        :city,
        :county,
        :street,
        :apartment_number,
        :description,
        :is_default,
      )
    end

    def find_address
      @address = @user.addresses.find(params[:id])
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
