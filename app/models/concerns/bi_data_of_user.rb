module BiDataOfUser
  extend ActiveSupport::Concern

  included do
    def bi_infos
      as_json(
        only: [],
        methods: %i[
          total_consumption_amount
          total_savings_amount
          total_balance
          best_deal_member_savings_amount
          best_deal_member_store_name
          most_consumption_amount_of_member
          most_consumption_store_name_of_member
          single_most_consumption_member_store_name
          single_most_consumption_amount
          single_most_consumption_at
          total_recharge_amount
          most_recharge_amount_member
          most_recharge_store_name_member
          single_most_recharge_member_store_name
          single_most_recharge_amount
          single_most_recharge_at
        ]
      )
    end

    # TODO: 看看以后有没有机会将这些数据放在一张 BI 表里面去消化，目前我还有没去做的机会。
    private

    # Consumption
    # 总共消费金额
    def total_consumption_amount
      consumption_member_orders.with_deleted.sum(:amount)
    end

    # 总共节约金额
    def total_savings_amount
      members.with_deleted.sum(:total_savings_amount)
    end

    # 当前总共的余额
    def total_balance
      members.with_deleted.sum(:balance)
    end

    # 优惠最多的会员卡优惠了的金额
    def best_deal_member_savings_amount
      best_deal_member&.total_savings_amount
    end

    # 优惠最多的会员卡的店名
    def best_deal_member_store_name
      best_deal_member&.store_name
    end

    # 优惠最多的会员对象
    def best_deal_member
      @best_deal_member ||= members.with_deleted.order(total_savings_amount: :desc).first
    end

    # 总共消费最多的会员卡消费的金额
    def most_consumption_amount_of_member
      most_consumption_member&.total_consumption_amount
    end

    # 总共消费最多的会员卡的店名
    def most_consumption_store_name_of_member
      most_consumption_member&.store_name
    end

    # 总共消费最多的会员对象
    def most_consumption_member
      @most_consumption_member ||= members.with_deleted.order(total_consumption_amount: :desc).first
    end

    # 最常去的门店
    def most_frequent_members_of_consumption
    # TODO ActiveRecord 可能有 bug 将 ForceExpenseMemberOrder 也查了进来

      group = consumption_member_orders.group(:member_id).count
      max_frequent = group.invert.keys.max
      member_ids = group.select { |_k, v| v == max_frequent }.keys
      data = {
        max_frequent:,
        stores: []
      }
      members.where(id: member_ids).each do |m|
        data[:stores] << { name: m.store_name }
      end
      data
    end

    # 单次最多消费
    def single_most_consumption_member_order
      @single_most_consumption_member_order ||= consumption_member_orders.order(amount: :desc).first
    end

    # 单次最多消费店名
    def single_most_consumption_member_store_name
      single_most_consumption_member_order&.member&.store_name
    end

    # 单次最多消费金额
    def single_most_consumption_amount
      single_most_consumption_member_order&.amount
    end

    # 单次最多消费时间
    def single_most_consumption_at
      single_most_consumption_member_order&.created_at
    end

    # Recharge
    # 总共充值金额
    def total_recharge_amount
      recharge_member_orders.with_deleted.sum(:amount)
    end

    # 总共充值最多的会员卡充值的金额
    def most_recharge_amount_member
      most_recharge_member&.total_recharge_amount
    end

    # 总共充值最多的会员卡的店名
    def most_recharge_store_name_member
      most_recharge_member&.store_name
    end

    # 总共充值最多金额的对象
    def most_recharge_member
      @most_recharge_member ||= members.with_deleted.order(total_recharge_amount: :desc).first
    end

    # 单次最多充值
    def single_most_recharge_member_order
      @single_most_recharge_member_order ||= recharge_member_orders.order(amount: :desc).first
    end

    # 单次最多充值店名
    def single_most_recharge_member_store_name
      single_most_recharge_member_order&.member&.store_name
    end

    # 单次最多充值金额
    def single_most_recharge_amount
      single_most_recharge_member_order&.amount
    end

    # 单次最多充值时间
    def single_most_recharge_at
      single_most_recharge_member_order&.created_at
    end
  end
end
