module Publics
  class UserSignInService
    # UserSignInService service

    # @params: [String] email
    # @params: [String] password
    # @return: [User] user

    include Interactor

    def call
      user = ::User.find_by(email: context.email)

      unless user
        return context.fail!(
          message: I18n.t("devise.failure.not_found_account", authentication_keys: I18n.t("activerecord.attributes.user.email")),
        )
      end

      unless user.valid_password?(context.password)
        return context.fail!(
          message: I18n.t("devise.failure.not_found_in_database", authentication_keys: I18n.t("activerecord.attributes.user.email")),
        )
      end

      # context.fail!(message: "Update Fail") unless user.update(is_logout: false)

      context.token = ::JsonWebToken.encode(
        user.jwt_payload, 1.month.from_now
      )
    rescue StandardError => e
      Rails.logger.error("Error generate token : #{e.message}")
      context.fail!(message: "Generate Token Error!, #{e.message}")
    end
  end
end
