class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAIL_SENDER", "Pet_Shop@gmail.com")
  layout "mailer"

  def mail_title_prefix
    return "DEV - " if Rails.env.development?
    return "STG - " if Rails.env.staging?

    return ""
  end
end
