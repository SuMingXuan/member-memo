require 'alipay'

module Payment
  class Ali
    attr_reader :client

    def initialize
      @client = Alipay::Client.new(
        url: ENV['ALI_PAY_API_URL'],
        app_id: ENV['ALI_PAY_APP_ID'],
        app_private_key: ENV['ALI_PAY_PRIVATE_KEY'],
        alipay_public_key: ENV['ALI_PAY_PUBLIC_KEY']
      )
    end

    def pay(order)
      # ascii_only is important!
      content = JSON.generate({
        out_trade_no: order.order_no,
        product_code: order.product_id,
        total_amount: order.payment_amount,
        subject: 'test'
      }, ascii_only: true)

      client.page_execute_url(
        method: 'alipay.trade.page.pay',
        biz_content: content,
        timestamp: Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
      )
    end
  end
end
