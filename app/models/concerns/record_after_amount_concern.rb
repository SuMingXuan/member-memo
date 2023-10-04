module RecordAfterAmountConcern
  extend ActiveSupport::Concern

  included do
    before_create :set_after_balance, :set_after_points_amount

    private

    def set_after_balance
      return unless amount > 0

      self.after_balance = member.balance
    end

    def set_after_points_amount
      return unless points_amount > 0

      self.after_points_amount = member.points_count
    end
  end
end
