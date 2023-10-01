class ApplicationController < ActionController::Base
  layout :custom_layout
  before_action :store_invitation_code
  before_action :authenticate_user!

  helper_method :wechat_share_setting

  def wechat_share_setting
    @wechat_share_setting ||= $wechat_client.get_jssign_package(request.url)
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
