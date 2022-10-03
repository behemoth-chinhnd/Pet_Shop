module Guard
  private

  def authenticate!(role)
    authorized =  case role
                  when :admin
                    admin?
                  when :customer
                    customer?
                  when :login
                    login?
                  when :public
                    true
                  else
                    false
                  end

    raise UnauthorizedError unless authorized

    true
  end

  def admin?
    Current.user && Current.user.instance_of?(Admin)
  end

  def customer?
    Current.user && Current.user.instance_of?(User)
  end

  def login?
    Current.user.present?
  end
end
