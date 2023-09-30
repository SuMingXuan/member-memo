class ProductsController < ApplicationController
  def index
    @products = Product.publish
  end

  def pay_success
    return if params[:out_trade_no].blank?

    order = Order.find_by(order_no: params[:out_trade_no])
    if order.pending?
      service = PayService.new(order)
      service.valid_paid!(params)
    end
    redirect_to pay_success_products_path
  end
end
