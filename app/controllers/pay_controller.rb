class PayController < ApplicationController
  def create
    order = current_user.orders.build
    order.product = product
    order.payment_amount = product.price
    order.payment_method = params[:payment_method]
    order.save
    if order.ali?
      pay_url = Payment::Ali.new.pay(order)
    end
    render json: { success: true, pay_url: pay_url }
  end

  private

  def order_params
    params.permit(:product_id)
  end

  def product
    @product ||= Product.publish.find(params[:product_id])
  end
end
