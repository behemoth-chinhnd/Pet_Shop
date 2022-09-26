require "json_web_token"

BEARER_AUTHORIZATION = "Bearer"

module Authenticable
  private

  def current_user
    return nil unless token

    service = ::Shared::Authentications::DecodeTokenService.call(token:)
    return service.success? ? service.user : nil
  end

  def current_admin
    return nil unless token

    service = ::Shared::Authentications::DecodeTokenAdminService.call(token:)
    return service.success? ? service.admin : nil
  end

  def token
    authen, token = request.headers["Authorization"].to_s.split(" ")
    return unless authen == BEARER_AUTHORIZATION

    token
  end
end
