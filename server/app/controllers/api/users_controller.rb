module Api
  class UsersController < ApplicationController
    before_action :auth?, except: [:index, :create, :send_email_reset_passsword, :reset_password]
    before_action :set_user

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
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def update
      form = ::Users::UserForm.new.assign_model(@user, user_params.except("email", "password").to_h)

      if form.save
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def destroy
      @user.destroy!
      response_success(@user)
    end

    def list_product
      product = @user.products.includes(:creator, :image_blob).order(id: :desc).ransack(params[:q]).result

      @pagy, @product = pagy(product, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

      response_list(@product, { adapter: :json,
                                each_serializer: ::Products::ListSerializer })
    end

    def show_product
      product = @user.products.find(params[:product_id])
      response_success(product, { serializer: ::Products::ShowSerializer })
    end

    def change_email
      form = ::Users::ChangeEmailForm.new.assign_model(@user, password_params.merge(params.permit(:email)).to_h)

      if form.save
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def change_password
      form = ::Users::ChangePasswordForm.new.assign_model(@user,
                                                          password_params.merge(params.permit(:new_password, :new_password_confirmation)).to_h)

      if form.save
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def change_name_store
      form = ::Users::ChangeNameStoreForm.new.assign_model(@user, password_params.merge(params.permit(:store_name, :shipping_fee)).to_h)

      if form.save
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def change_phone
      form = ::Users::ChangePhoneForm.new.assign_model(@user, password_params.merge(params.permit(:phone)).to_h)

      if form.save
        response_success(form.model, { serializer: ::Users::UserListSerializer })
      else
        response_error(form.errors.to_hash(true))
      end
    end

    def send_email_reset_passsword
      user = User.find_by(email: params[:email])

      if user.present?
        ::Publics::SendPasswordResetEmailService.call(user:)

        response_success("Send Email Successfull")
      else
        response_not_found
      end
    end

    def reset_password
      password_reset_token = Devise.token_generator.digest(User, :password_reset_token, params[:token])

      user = ::User.find_by(password_reset_token:)

      if user.present? && user.password_reset_token_valid_datetime >= Time.current
        form = ::Publics::PasswordResetForm.new.assign_model(user, password_params.merge(params.permit(:password_confirmation)).to_h)

        if form.save
          response_success("Reset Password Successfull")
        else
          response_error(form.errors.to_hash(true))
        end
      else
        response_not_found
      end
    end

    private

    def user_params
      user_params = params.require(:user).permit(
        :is_active,
        :name,
        :email,
        :user_type,
        :phone,
        :address,
        :sex_id,
        :birthday,
      ).merge(params.permit(:avatar_key))

      params[:password].present? ? user_params.merge(params.permit(:password)) : user_params
    end

    def password_params
      params.permit(:password)
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
