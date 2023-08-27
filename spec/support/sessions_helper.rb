module SessionsHelper
  def sign_in(user)
    warden.set_user(user)
  end
end