module Publics
  class AdminSignInService
    include Interactor

    def call
      admin = ::Admin.find_by(email: context.email)
      if admin.blank?
        context.fail!(
          message: I18n.t("devise.failure.not_found_account", authentication_keys: I18n.t("activerecord.attributes.administrator.email")),
        )
      end

      unless admin.valid_password?(context.password)
        context.fail!(
          message: I18n.t("devise.failure.not_found_in_database", authentication_keys: I18n.t("activerecord.attributes.administrator.email")),
        )
      end

      # context.fail!(message: "Update Fail") unless admin.update(is_logout: false)

      context.id = admin.id

      context.token = ::JsonWebToken.encode(
        admin.jwt_payload, 1.month.from_now
      )
    rescue StandardError => e
      Rails.logger.error("Error generate token : #{e.message}")
      context.fail!(message: "Generate Token Error!, #{e.message}")
    end
  end
end
