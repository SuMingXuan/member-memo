class Member < ApplicationRecord
  include UuidConcern
  attr_accessor :force_income_or_expense

  FREE_THEMES = { dark: 0, primary: 1, red: 2 }.freeze
  PAID_THEMES = {}.freeze
  THEMES = FREE_THEMES.merge(PAID_THEMES)

  acts_as_paranoid

  enum theme: FREE_THEMES

  belongs_to :user, counter_cache: true
  has_many :coupons, dependent: :destroy
  has_many :available_coupons, -> { available }, class_name: 'Coupon', foreign_key: :member_id
  has_one :point, dependent: :destroy
  has_many :member_orders, dependent: :destroy
  has_many :recharge_member_orders, dependent: :destroy
  has_many :consumption_member_orders, dependent: :destroy
  has_many :force_expense_member_orders, dependent: :destroy
  has_many :force_income_member_orders, dependent: :destroy

  validates :discount, presence: true,
                       numericality: { greater_than: 0, less_than_or_equal_to: 10, message: '折扣应该大于 0 且小于等于 10' }

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

  def savings(amount)
    original_amount = amount / (discount / 10.0)
    original_amount - amount
  end

  def record_total_consumption_and_savings_amount(amount)
    self.total_consumption_amount += amount
    self.total_savings_amount += savings(amount)
  end

  def record_total_recharge_amount(amount)
    self.total_recharge_amount += amount
  end

  private

  # TODO: 如果项目能成功，这部分代码需要重构，这里的回调可能比较复杂，需要用 swiper 通过广播的方式异步去计算

  def listen_income_and_expense
    return unless balance_changed? || points_count_changed? || coupons_count_changed?

    calculate_balance if balance_changed?
    calculate_points if points_count_changed?
    force_income_or_expense ? build_force_member_orders : build_member_orders
  end

  def calculate_balance
    amount_difference = changed_difference('balance')
    if amount_difference > 0
      consumption_infos[:amount] = amount_difference
    else
      recharge_infos[:amount] = -amount_difference
    end
  end

  def changed_difference(field)
    before, now = changes[field.to_s]
    before - now
  end

  def calculate_points
    points_difference = changed_difference('points_count')
    if points_difference > 0
      consumption_infos[:points_amount] = points_difference
    else
      recharge_infos[:points_amount] = -points_difference
    end
  end

  def build_member_orders
    if consumption_infos.present?
      consumption_member_orders.build.consumption(**consumption_infos)
      record_total_consumption_and_savings_amount(consumption_infos[:amount])
    end
    return unless recharge_infos.present?

    recharge_member_orders.build.recharge(**recharge_infos)
    record_total_recharge_amount(recharge_infos[:amount])
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
