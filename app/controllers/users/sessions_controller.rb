# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include EncryptConcern

  layout 'devise'
  before_action :check_phone_format!, only: %i[send_verify_code create]
  before_action :check_send_frequent!, only: :send_verify_code
  before_action :check_verify_code!, only: :create

  after_action :write_cache_for_verify_code, only: :send_verify_code
  after_action :clear_verify_code_cache, only: :create

  def create
    user = User.find_or_initialize_by(phone: params[:phone])
    if user.new_record?
      user.invitation_code = cookies[:invitation_code]
      user.name = encrypt_phone_number(params[:phone])
      user.save
    end
    sign_in(resource_name, user)

    render json: { success: true, location: root_path }
  end

  def send_verify_code
    Tencent::Sms.new.send_verify_code(params[:phone], verify_code) if Rails.env.production?
    render json: { success: true }
  end

  private

  def verify_code_cache_key
    "Registration/VerifyCode/#{params[:phone]}"
  end

  def verify_code_value_cache_key
    "Registration/VerifyCode/#{params[:phone]}/value"
  end

  def check_verify_code!
    return if params[:verify_code] && params[:verify_code] == Rails.cache.read(verify_code_value_cache_key)

    render json: { success: false,
                   message: t('errors.messages.verify_code_not_match') }
  end

  def check_send_frequent!
    return unless Rails.cache.read(verify_code_cache_key)

    render json: { success: false,
                   message: t('errors.messages.frequent_sending') }
  end

  def write_cache_for_verify_code
    Rails.cache.write(verify_code_cache_key, true, expires_in: 60)
    Rails.cache.write(verify_code_value_cache_key, verify_code, expires_in: 10.minutes)
  end

  def clear_verify_code_cache
    Rails.cache.delete(verify_code_value_cache_key)
  end

  def verify_code
    @verify_code ||= Rails.env.production? ? rand(0..999_999).to_s.rjust(6, '0') : '123456'
  end

  def check_phone_format!
    return unless params[:phone].blank? || !params[:phone].match?(/\A\d{11}\z/)

    render json: { success: false, message: t('errors.messages.phone_format_invalid') }
  end
end
