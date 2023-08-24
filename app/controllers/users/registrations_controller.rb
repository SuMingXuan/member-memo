# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  def create; end

  def send_verify_code
    if Rails.cache.read(verify_code_cache_key)
      return render json: { success: false,
                            message: t('errors.messages.frequent_sending') }
    end

    Rails.cache.write(verify_code_cache_key, true, expires_in: 60)
    render json: { success: true }
  end

  private

  def verify_code_cache_key
    "Registration/VerifyCode/#{params[:phone]}"
  end
end
