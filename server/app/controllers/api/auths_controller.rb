module Api
  class AuthsController < ApplicationController
    before_action :auth?, only: [:logout]
    before_action :set_user

    def status
      render json: { message: "App is running" }
    end

    def user_login
      service = ::Publics::UserSignInService.call(email: params[:email], password: params[:password])

      if service.success?
        render json: service.token, status: :ok
      else
        render json: { message: service.message }, status: :unauthorized
      end
    end

    def logout
      if @user.update(is_logout: true)
        response_success("Logout Successful")
      else
        response_error("Logout Failed")
      end
    end

    def admin_login
      service = ::Publics::AdminSignInService.call(email: params[:email], password: params[:password])

      if service.success?
        render json: service.token, status: :ok
      else
        render json: { message: service.message }, status: :unauthorized
      end
    end

    private

    def set_user
      @user = Current.user
    end

    def auth?
      authenticate!(:login)
    end
  end
end
