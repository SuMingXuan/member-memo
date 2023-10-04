class MemberOrder < ApplicationRecord
  include RecordAfterAmountConcern

  belongs_to :member
  has_many :member_order_items, dependent: :destroy
  acts_as_paranoid

  before_save

  def created_date
    created_at.to_date
  end

  def as_json_list
    as_json(
      only: %i[type amount points_amount remark uuid created_at savings_amount after_balance after_points_amount],
      methods: %i[created_date]
    )
  end
end
