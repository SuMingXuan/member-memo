class ApplicationController < ActionController::Base
  layout :custom_layout
  before_action :authenticate_user!

  private

  def custom_layout
    'main_frame' if turbo_frame_request?
    'application'
  end
end
