module Guard
  private

  def authenticate!(role)
    authorized =  case role
                  when :admin
                    admin?
                  when :customer
                    customer?
                  when :public
                    true
                  else
                    false
                  end

    raise UnauthorizedError unless authorized

    true
  end

  def admin?
    Current.admin.present?
  end

  def customer?
    Current.user && Current.user.instance_of?(User)
  end
end
