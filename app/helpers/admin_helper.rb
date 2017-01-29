require 'digest'

module AdminHelper

  def remember
    token = Digest::SHA1.hexdigest(SecureRandom.urlsafe_base64)
    $redis.set('token', token)
    cookies.permanent.signed[:token] = token
    #session[:token] = token
  end

  def log_in(user, password)
    password = Digest::SHA1.hexdigest(password)
    if $redis.get('user') == user && $redis.get('password') == password
      remember
      return true
    else
      cookies.permanent.signed[:token] = nil
      return false
    end
  end

  def logged_in?
    cookies.signed[:token] && cookies.signed[:token] == $redis.get('token')
    #session[:token] && session[:token] == $redis.get('token')
  end

  def requireLogIn
    unless logged_in?
      raise ActionController::RoutingError.new ("No route matches [GET] '#{request.original_fullpath}'")
    end
  end

  def log_out
    $redis.del('token')
    cookies.permanent[:token] = nil
  end
end