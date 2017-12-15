# frozen_string_literal: true

require 'test_helper'
require 'digest'

class AdminControllerTest < ActionDispatch::IntegrationTest
  def setup
    login
  end

  def teardown
    logout
  end

  test 'should get log in page' do
    get login_path
    assert_response :success
  end

  test 'should log in if correct credentials provided' do
    post login_path, params: {
      user:     'test',
      password: 'test'
    }

    assert_equal @controller.send(:cookies).signed['token'], $redis.get('token')
  end

  test 'should not log in if wrong credentials' do
    post login_path, params: {
      user:     'test',
      password: 'test_fake'
    }

    assert_not_equal @controller.send(:cookies).signed['token'], $redis.get('token')
  end
end
