require "json_web_token"

BEARER_AUTHORIZATION = "Bearer"

module Authenticable
  private

  def current_user
    return nil unless token

    begin
      decoded = JsonWebToken.decode(token)

      service = if decoded[:type] == "user"
                  ::Shared::Authentications::DecodeTokenService.call(decoded:)
                else
                  ::Shared::Authentications::DecodeTokenAdminService.call(decoded:)
                end
    rescue StandardError => _e
      return nil
    end

    return service.success? ? service.user : nil
  end

  def token
    authen, token = request.headers["Authorization"].to_s.split(" ")
    return unless authen == BEARER_AUTHORIZATION

    token
  end
end
