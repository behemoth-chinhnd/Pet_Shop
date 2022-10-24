module Publics
  class SendPasswordResetEmailService
    include Interactor

    def call
      raw, token = Devise.token_generator.generate(User, :password_reset_token)

      context.user.password_reset_token = token
      context.user.password_reset_token_valid_datetime = Time.current + 6.minutes
      context.user.save!

      protocol = Rails.env.development? ? "http://" : "https://"

      password_reset_url = "#{protocol}#{ENV['FRONT_ENDPOINT']}/user/reset-password/#{raw}"
      # send mail
      ::UsersMailer.password_reset_email(
        context.user,
        password_reset_url,
      ).deliver_later
    end
  end
end
