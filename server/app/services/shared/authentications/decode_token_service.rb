module Shared
  module Authentications
    class DecodeTokenService
      include Interactor

      def call
        user = ::User.find_by(id: context.decoded["sub"])

        context.fail!(message: "Token invalid!") if user.blank? || user.is_logout

        context.user = user
      end
    end
  end
end
