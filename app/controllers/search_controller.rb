# frozen_string_literal: true

class SearchController < ApplicationController
  def query
    response.headers['Expires'] = 5.hours.from_now.httpdate
    respond_to do |format|
      format.json do
        results = $redis.smembers("search-#{params[:type]}-#{params[:q][0]}")
        render json: results
      end
    end
  end
end
