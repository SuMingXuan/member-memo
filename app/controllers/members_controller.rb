class MembersController < ApplicationController
  # before_action :check_members_count!, only: :create
  def index
    @members = current_user.members.sorted_by_expiry
    @members = @members.page(params[:page])
    @show_hidden = @members.deleted.count > 0
    respond_to do |format|
      format.json do
        render json: { success: true, members: @members.as_json(except: %i[id user_id created_at updated_at]) }
      end
      format.html {}
    end
  end

  def hidden
    @members = current_user.members.deleted.sorted_by_expiry
    @members = @members.page(params[:page])
    respond_to do |format|
      format.json do
        render json: { success: true, members: @members.as_json(except: %i[id user_id created_at updated_at]) }
      end
      format.html {}
    end
  end

  def toggle_display
    @member = member
    if params[:hidden]
      @member.update(deleted_at: Time.now)
    else
      @member.update(deleted_at: nil)
    end
    render json: { success: true, deleted_at: @member.deleted_at }
  end

  def show
    @member = member
    @member_orders = @member.member_orders.order(id: :desc)
  end

  def create
    ActiveRecord::Base.transaction do
      @member = current_user.members.build(member_params)

      # 一次充值需要手动新建一个充值和消费的订单
      if member_params[:balance] > 0
        order = @member.recharge_member_orders.build
        @member.record_total_recharge_amount(member_params[:balance])
        order.recharge(amount: member_params[:balance])
      end

      if params[:consumption] > 0
        @member.balance -= params[:consumption]
        @member.record_total_consumption_and_savings_amount(params[:consumption])
        order = @member.consumption_member_orders.build
        order.consumption(amount: params[:consumption])
      end

      if @member.save && current_user.birthday.blank?
        current_user.birthday = @member.birthday
        current_user.save
      end
    end

    render json: { success: true, location: member_path(@member.uuid) }
  end

  def update
    if member.update(update_member_params)
      render json: { success: true }
    else
      render json: { success: false, message: member.errors.messages.values.flatten.join('，') }
    end
  end

  def recharge
    member.balance += charge_params[:amount].to_f
    member.points_count += charge_params[:points_amount].to_f
    if member.save
      render json: { success: true }
    else
      render json: { success: false, message: member.errors.messages.values.flatten.join('，') }
    end
  end

  def consumption
    amount = charge_params[:amount].to_f
    member.balance -= amount
    member.points_count -= charge_params[:points_amount].to_f
    if member.save
      render json: { success: true }
    else
      render json: { success: false, message: member.errors.messages.values.flatten.join('，') }
    end
  end

  private

  def member
    @member ||= current_user.members.with_deleted.find_by(uuid: params[:uuid])
  end

  def member_params
    @member_params ||= params.require(:member).permit(:card_number, :birthday, :store_name, :balance, :theme, :discount)
  end

  def update_member_params
    params.permit(
      :card_number, :store_name, :balance, :level, :expires_at,
      :birthday, :store_address, :activity_rules, :force_income_or_expense,
      :points_count, :discount
    )
  end

  def charge_params
    params.permit(:amount, :points_amount)
  end

  def check_members_count!
    return unless current_user.members.count >= current_user.max_members_count

    render json: { success: false, message: t('errors.messages.not_enough_members_count') }
  end
end
