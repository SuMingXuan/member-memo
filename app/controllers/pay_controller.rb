class PayController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[ali_auth]
  skip_before_action :authenticate_user!, only: %i[ali_auth]

  def create
    order = current_user.orders.build
    order.product = product
    order.payment_amount = product.price
    order.payment_method = params[:payment_method]
    order.payment_scene = browser.device.mobile? ? 'h5' : 'pc'
    order.save

    service = PayService.new(order)
    render json: { success: true, pay_url: service.pay_url(request.host) }
  end

  def ali_auth
    order = Order.find_by(order_no: params[:out_trade_no])
    # pending 状态下就不用处理后续逻辑了
    return render json: 'success' unless order.pending?

    service = PayService.new(order)
    service.valid_paid!(params)
    render json: 'success'
  end

  private

  def order_params
    params.permit(:product_uuid)
  end

  def product
    @product ||= Product.publish.find_by(uuid: params[:product_uuid])
  end
end
