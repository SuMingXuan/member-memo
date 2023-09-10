class ProductsController < ApplicationController
  def index
    @products = Product.publish
  end
end
