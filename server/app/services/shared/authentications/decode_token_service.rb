module Shared
  module Authentications
    class DecodeTokenService
      include Interactor

      def call
        context.fail!(message: "Token invalid!") if context.token.blank?

        decode_token = JsonWebToken.decode(context.token)
        context.fail!(message: "Token invalid!") if decode_token["type"] == "admin"
        user = ::User.find_by(id: decode_token["sub"])

        context.fail!(message: "Token invalid!") if user.blank? || user.is_logout

        context.user = user
      rescue JWT::DecodeError, JWT::ExpiredSignature, StandardError => e
        context.fail!(message: e.message)
      end
    end
  end
end
