module Tencent
  class Sms
    attr_accessor :appid, :appkey, :host, :credential, :client

    def initialize
      @appid = ENV['TENCENT_APP_ID']
      @appkey = ENV['TENCENT_APP_KEY']
      @host = 'https://sms.tencentcloudapi.com/'
      @credential = TencentCloud::Common::Credential.new(ENV['TENCENT_SMS_SECRET_ID'], ENV['TENCENT_SMS_SECRET_KEY'])
      @client = TencentCloud::Sms::V20210111::Client.new(credential, 'ap-beijing')
    end

    def send_verify_code(phone, verify_code)
      # 参数顺序 (phonenumberset=nil, smssdkappid=nil, templateid=nil, signname=nil, templateparamset=nil, extendcode=nil, sessioncontext=nil, senderid=nil)
      request = TencentCloud::Sms::V20210111::SendSmsRequest.new(
        [phone],
        appid,
        ENV['TENCENT_VERIFY_CODE_TEMPLATE_ID'],
        ENV['TENCENT_VERIFY_CODE_SIGN'],
        [verify_code]
      )
      client.SendSms(request)
    end
  end
end
