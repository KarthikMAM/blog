class StaticPagesController < ApplicationController
  layout "index"

  def home
    render file: "public/index.html"
  end

  def about

  end

  def contact

  end
end
