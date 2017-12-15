# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def login
    $redis.set('user', 'test')
    $redis.set('password', Digest::SHA1.hexdigest('test'))
    post login_path, params: { user: 'test', password: 'test' }
  end

  def logout
    get logout_path
  end
end
