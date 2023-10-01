class ApplicationController < ActionController::Base
  layout :custom_layout
  before_action :store_invitation_code
  before_action :authenticate_user!

  helper_method :wechat_share_setting

  def wechat_share_setting
    @wechat_share_setting ||= Rails.cache.fetch('weixin_authorize', expires_in: 1.hour) do
      WeixinAuthorize::Client.new(
        ENV.fetch('WECHAT_APP_ID'),
        ENV.fetch('WECHAT_APP_SECRET')
      ).get_jssign_package(root_url)
    end
  end

  private

  def custom_layout
    'main_frame' if turbo_frame_request?
    'application'
  end

  def store_invitation_code
    return unless params[:invitation_code].present?

    cookies[:invitation_code] = params[:invitation_code]
  end
end
