class MembersController < ApplicationController
  def index
    @members = current_user.members.sorted_by_expiry
    @members = @members.page(params[:page])
    respond_to do |format|
      format.json do
        render json: { success: true, members: @members.as_json(except: %i[id user_id created_at updated_at]) }
      end
      format.html {}
    end
  end

  def show
    member
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

  def update
    if member.update(update_member_params)
      render json: { success: true }
    else
      render json: { success: false, message: member.full_message }
    end
  end

  private

  def member
    @member ||= current_user.members.find_by(uuid: params[:uuid])
  end

  def member_params
    params.require(:member).permit(:card_number, :birthday, :store_name, :balance, :theme).tap do |options|
      if params[:member][:balance].present? && params[:consumption].present?
        options[:balance] = (params[:member][:balance].to_f - params[:consumption].to_f).round(2)
      end
    end
  end

  def update_member_params
    params.require(:member).permit(
      :card_number, :store_name, :balance, :level, :expires_at, :birthday, :store_address, :activity_rules
    )
  end
end
