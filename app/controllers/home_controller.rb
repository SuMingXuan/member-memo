class HomeController < ApplicationController
  def index
    render json: 'Hello Word'
  end
end
