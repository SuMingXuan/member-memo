class ConsumptionMemberOrder < MemberOrder
  def consumption(amount: 0, points_amount: 0, coupons: [])
    decrement_member_balance(amount)
    decrement_member_points(points_amount)
    decrement_member_coupons(coupons)
  end

  private

  def decrement_member_balance(amount)
    return unless amount > 0

    savings = member.savings(amount)
    self.amount = amount
    self.savings_amount = savings
  end

  def decrement_member_points(points_amount)
    return unless points_amount > 0

    self.points_amount = points_amount
  end

  def decrement_member_coupons(coupons = [])
    coupons.each do |coupon|
      order_item = member_order_items.build
      order_item.item = coupon
    end
  end
end
