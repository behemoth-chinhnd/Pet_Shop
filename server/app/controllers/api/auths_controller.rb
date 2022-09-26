module Api
  class AuthsController < ApplicationController
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

    def admin_login
      service = ::Publics::AdminSignInService.call(email: params[:email], password: params[:password])

      if service.success?
        render json: service.token, status: :ok
      else
        render json: { message: service.message }, status: :unauthorized
      end
    end
  end
end
