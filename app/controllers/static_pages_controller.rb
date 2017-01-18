class StaticPagesController < ApplicationController
  def home
    render html: 'hello'
  end
end
