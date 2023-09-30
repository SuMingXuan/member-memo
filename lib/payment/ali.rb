require 'alipay'

module Payment
  class Ali
    include Rails.application.routes.url_helpers

    def initialize(order)
      @order = order
    end

    def pay_url(host)
      case @order.payment_scene
      when 'h5'
        @pay_method = 'alipay.trade.wap.pay'
        @product_code = 'QUICK_WAP_WAY'
      when 'pc'
        @pay_method = 'alipay.trade.page.pay'
        @product_code = 'FAST_INSTANT_TRADE_PAY'
      end
      client.page_execute_url(
        method: @pay_method,
        notify_url: ali_auth_pay_index_url(host:, protocol: 'https'),
        return_url: pay_success_products_url(host:),
        biz_content: JSON.generate({
                                     out_trade_no: @order.order_no,
                                     product_code: @product_code,
                                     total_amount: @order.payment_amount.to_s,
                                     subject: "#{I18n.t('site_name')} - 购买 #{@order.product.count} 张卡位"
                                   }, ascii_only: true), # ascii_only is important!
        timestamp: Time.zone.now.strftime('%Y-%m-%d %H:%M:%S')
      )
    end

    def valid_paid
      response = client.execute(
        method: 'alipay.trade.query',
        biz_content: {
          out_trade_no: @order.order_no
        }.to_json(ascii_only: true)
      )
      JSON.parse(response)['alipay_trade_query_response']['trade_status']
    end

    private

    def client
      @client ||= Alipay::Client.new(
        url: ENV['ALI_PAY_API_URL'],
        app_id: ENV['ALI_PAY_APP_ID'],
        app_private_key:,
        alipay_public_key:,
        app_cert_sn:,
        alipay_root_cert_sn:
      )
    end

    def app_private_key
      @app_private_key ||= File.read(Rails.root.join('lib/payment/ali_certificates/private_key.pem'))
    end

    def alipay_public_key
      @alipay_public_key ||= begin
        content = File.read(Rails.root.join('lib/payment/ali_certificates/CertPublicKey_RSA2.crt'))
        OpenSSL::X509::Certificate.new(content).public_key.to_s
      end
    end

    def app_cert_sn
      @app_cert_sn ||= begin
        content = File.read(Rails.root.join('lib/payment/ali_certificates/appCertPublicKey.crt'))
        Alipay::Utils.get_cert_sn(content)
      end
    end

    def alipay_root_cert_sn
      @alipay_root_cert_sn ||= begin
        content = File.read(Rails.root.join('lib/payment/ali_certificates/RootCert.crt'))
        Alipay::Utils.get_root_cert_sn(content)
      end
    end
  end
end
