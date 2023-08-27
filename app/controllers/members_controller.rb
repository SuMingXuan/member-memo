class MembersController < ApplicationController
  def index
    @members = current_user.members.sorted_by_expiry
    @members = @members.page(params[:page])
  end

  def show
    @member = current_user.members.find_by(uuid: params[:uuid])
  end

  def create
    member = current_user.members.build(member_params)
    member.save

    if member.save && current_user.birthday.blank?
      current_user.birthday = member.birthday
      current_user.save
    end
    render json: { success: true, location: member_path(member.uuid) }
  end

  private

  def member_params
    params.require(:member).permit(:card_number, :birthday, :store_name, :balance, :theme).tap do |options|
      options[:balance] = (params[:member][:balance].to_f - params[:consumption].to_f).round(2)
    end
  end
end
