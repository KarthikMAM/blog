require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @default_title = "Karthik's Blog"
  end

  test 'should get home' do
    get home_path
    assert_response :success
    assert_select 'head title', {count: 1, text: "Home | #{@default_title}"}
    assert_select 'body ul.nav li', {count: 5, class: ''}
  end

  test 'should get about' do
    get about_path
    assert_response :success
    assert_select 'head title', {count: 1, text: "About | #{@default_title}"}
    assert_select 'body ul.nav li', {count: 1, class: 'active', text: 'About'}
  end

  test 'should get contact' do
    get contact_path
    assert_response :success
    assert_select 'head title', {count: 1, text: "Contact | #{@default_title}"}
    assert_select 'body ul.nav li', {count: 1, class: 'active', text: 'Contact'}
  end

end
