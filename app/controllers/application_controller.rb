class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include AdminHelper

  def hello
    render html: 'Hello world'
  end
end
