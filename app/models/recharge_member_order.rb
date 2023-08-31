class RechargeMemberOrder < MemberOrder
  def recharge(amount: 0, points_amount: 0, coupons: [])
    increment_member_balance(amount)
    increment_member_points(points_amount)
    increment_member_coupons(coupons)
  end

  private

  def increment_member_balance(amount)
    return if amount <= 0

    self.amount = amount
  end

  def increment_member_points(points_amount)
    return if points_amount <= 0

    self.points_amount = points_amount
  end

  def increment_member_coupons(coupons = [])
    coupons.each do |coupon|
      order_item = member_order_items.build
      order_item.item = coupon
    end
  end
end
