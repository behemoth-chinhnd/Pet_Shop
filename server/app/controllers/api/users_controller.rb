module Api
  class UsersController < ApplicationController
    before_action :set_user, if: :auth?, only: [:show, :update, :destroy]

    def show
      response_success(@user, { serializer: ::Users::ShowSerializer })
    end

    def index
      user = User.order(id: :desc).ransack(params[:q]).result
      @pagy, @user = pagy(user, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@user, { adapter: :json,
                             each_serializer: ::Users::UserListSerializer })
    end

    def create
      form = ::Users::UserForm.new.assign_model(::User.new, user_params.to_h)

      if form.save
        # binding.pry
        response_success(form, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def update
      form = ::Users::UserForm.new.assign_model(@user, user_params.to_h)

      if form.save
        response_success(@user, { serializer: ::Users::UserListSerializer })
      else
        response_error(@user.errors.to_hash(true))
      end
    end

    def destroy
      @user.destroy!
      response_success(@user)
    end

    private

    def user_params
      user_params = params.require(:user).permit(:is_active, :name, :email, :user_type, :phone, :address, :sex_id, :birthday)
      user_params = user_params.merge(params.permit(:password)) if params[:password].present?
      user_params
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
