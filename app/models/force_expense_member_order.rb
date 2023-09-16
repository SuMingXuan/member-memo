class ForceExpenseMemberOrder < MemberOrder
  include ConsumptionConcern

  private

  def decrement_member_balance(amount)
    return unless amount > 0

    self.amount = amount
  end
end
