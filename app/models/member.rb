class Member < ApplicationRecord
  include UuidConcern
  attr_accessor :force_income_or_expense

  FREE_THEMES = { dark: 0, primary: 1 }.freeze
  PAID_THEMES = {}.freeze
  THEMES = FREE_THEMES.merge(PAID_THEMES)

  acts_as_paranoid

  enum theme: FREE_THEMES

  belongs_to :user, counter_cache: true
  has_many :coupons, dependent: :destroy
  has_one :point, dependent: :destroy
  has_many :member_orders, dependent: :destroy
  has_many :recharge_member_orders, dependent: :destroy
  has_many :consumption_member_orders, dependent: :destroy
  has_many :force_expense_member_orders, dependent: :destroy
  has_many :force_income_member_orders, dependent: :destroy

  scope :sorted_by_expiry, lambda {
    order(Arel.sql("
      CASE WHEN expires_at IS NULL THEN 1 WHEN expires_at > '#{Time.now}' THEN 0 ELSE 2 END,
      expires_at ASC")).order(balance: :desc)
  }

  before_save :listen_income_and_expense, if: :persisted?

  def to_param
    uuid
  end

  def as_json_list
    as_json(except: %i[id user_id created_at updated_at])
  end

  private

  def listen_income_and_expense
    return unless balance_changed? || points_count_changed? || coupons_count_changed?

    calculate_balance if balance_changed?
    calculate_points if points_count_changed?
    force_income_member_orders ? build_force_member_orders : build_member_orders
  end

  def calculate_balance
    before, now = changes['balance']
    amount_difference = before - now

    if amount_difference > 0
      consumption_infos[:amount] = amount_difference
    else
      recharge_infos[:amount] = -amount_difference
    end
  end

  def calculate_points
    before, now = changes['points_count']
    points_difference = before - now

    if points_difference > 0
      consumption_infos[:points_amount] = points_difference
    else
      recharge_infos[:points_amount] = -points_difference
    end
  end

  def build_member_orders
    consumption_member_orders.build.consumption(**consumption_infos) if consumption_infos.present?
    return unless recharge_infos.present?

    recharge_member_orders.build.recharge(**recharge_infos)
  end

  def build_force_member_orders
    force_expense_member_orders.build.consumption(**consumption_infos) if consumption_infos.present?
    return unless recharge_infos.present?

    force_income_member_orders.build.recharge(**recharge_infos)
  end

  def consumption_infos
    @consumption_infos ||= {}
  end

  def recharge_infos
    @recharge_infos ||= {}
  end
end
