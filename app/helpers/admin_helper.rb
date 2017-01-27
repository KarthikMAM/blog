require 'digest'

module AdminHelper

  def remember
    token = Digest::SHA1.hexdigest(SecureRandom.urlsafe_base64)
    $redis.set('token', token)
    cookies.permanent.signed[:token] = token
  end

  def log_in(user, password)
    password = Digest::SHA1.hexdigest(password)
    if $redis.get('user') == user && $redis.get('password') == password
      remember
      return true
    else
      return false
    end
  end

  def logged_in?
    if session[:token] && session[:token] == cookies.signed[:token]
      return true
    elsif cookies.signed[:token] && cookies.signed[:token] == $redis.get('token')
      session[:token] = cookies.signed[:token]
      return true
    else
      return false
    end
  end

  def requireLogIn
    print "User is logged in #{logged_in?}"
    unless logged_in?
      flash[:error] = [['Log In', 'User not logged in']]
      redirect_to login_path
    end
  end

  def log_out
    $redis.del('session')
  end
end