class ProfileController < ApplicationController
  def show
    @bi_infos = current_user.bi_infos

    # @bi_infos = Rails.cache.fetch("users/bi_info/#{current_user.id}", expires_in: 1.minute) do
    #   current_user.bi_infos
    # end
  end

  def update
    if current_user.update(update_params)
      render json: { success: true }
    else
      render json: { success: false, message: current_user.errors.messages.values.flatten.join('，') }
    end
  end

  private

  def update_params
    params.permit(:birthday)
  end
end
