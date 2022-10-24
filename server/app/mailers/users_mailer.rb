class UsersMailer < ApplicationMailer
  # def email_confirmation_email(unconfirmed_email, activate_url)
  #   body_template = Liquid::Template.parse(I18n.t("users.emails.verification.body"))
  #   @body = body_template.render({
  #     url: activate_url,
  #   }.with_indifferent_access)

  #   subject_template = Liquid::Template.parse(I18n.t("users.emails.verification.title").chomp)
  #   @subject = subject_template.render({
  #     email: unconfirmed_email,
  #   }.with_indifferent_access)

  #   mailer_options = {
  #     to: unconfirmed_email,
  #     subject: @subject,
  #   }

  #   mail(mailer_options)
  # end

  def password_reset_email(user, password_reset_url)
    body_template = Liquid::Template.parse(I18n.t("users.emails.password_reset_email.body"))
    @body = body_template.render({
      url: password_reset_url,
    }.with_indifferent_access)

    subject_template = Liquid::Template.parse(I18n.t("users.emails.password_reset_email.title").chomp)
    @subject = subject_template.render({
      email: user.email,
    }.with_indifferent_access)

    mailer_options = {
      to: user.email,
      subject: @subject,
    }

    mail(mailer_options)
  end
end
