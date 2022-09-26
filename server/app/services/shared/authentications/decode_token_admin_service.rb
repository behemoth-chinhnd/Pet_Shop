module Shared
  module Authentications
    class DecodeTokenAdminService
      include Interactor

      def call
        context.fail!(message: "Token invalid!") if context.token.blank?

        decode_token = JsonWebToken.decode(context.token)
        context.fail!(message: "Token invalid!") if decode_token["type"] != "admin"

        admin = ::Administrator.find_by(id: decode_token["sub"])

        context.fail!(message: "Token invalid!") if admin.blank? || admin.is_logout

        context.admin = admin
      rescue JWT::DecodeError, JWT::ExpiredSignature, StandardError => e
        context.fail!(message: e.message)
      end
    end
  end
end
