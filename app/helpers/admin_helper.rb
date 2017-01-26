require 'digest'

module AdminHelper

  def remember
    token = Digest::SHA1.hexdigest(SecureRandom.urlsafe_base64)
    $redis.set('token', token)
    cookies.permanent.signed[:token] = token
  end

  def log_in(user, password)
    password = Digest::SHA1.hexdigest(password)
    print password
    if $redis.get('user') == user && $redis.get('password') == password
      remember
      return true
    else
      return false
    end
  end

  def logged_in?
    if session[:token] == cookies.signed[:token]
      return true
    elsif cookies.signed[:token] == $redis.get('token')
      session[:token] = cookies.signed[:token]
      return true
    else
      return false
    end
  end

  def log_out
    $redis.del('session')
  end
end
