class ApplicationController < ActionController::API
  include Authenticable
  include Response
  include Guard

  before_action :set_user!

  private

  def set_user!
    Current.user = current_user
  end
end
