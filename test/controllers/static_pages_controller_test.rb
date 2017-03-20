require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @default_title = 'Karthik M A M'
  end

  test 'should get home' do
    get '/'
    assert_response :success
    assert_select 'head title', {count: 1, text: @default_title}
  end

  test 'should get about' do
    get '/about'
    assert_response :success
    assert_select 'head title', {count: 1, text: @default_title}
  end

  test 'should get contact' do
    get '/contact'
    assert_response :success
    assert_select 'head title', {count: 1, text: @default_title}
  end

end
