class PayService
  def initialize(order)
    @order = order
  end

  def pay_url(host = 'member-memo.com')
    case @order.payment_method
    when 'ali'
      service = Payment::Ali.new(@order)
    when 'weixin'
    end
    service.pay_url(host)
  end

  def valid_paid!(callback_params = {})
    success = false
    case @order.payment_method
    when 'ali'
      service = Payment::Ali.new(@order)
      success = service.valid_paid == 'TRADE_SUCCESS'
    when 'weixin'
    end

    trade!(callback_params) if success
  end

  def trade!(callback_params)
    user = @order.user
    count = @order.product.count
    user.max_members_count += count
    user.save
    @order.callback_data = callback_params
    @order.success!
  end
end
