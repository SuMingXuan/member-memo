class MemberOrder < ApplicationRecord
  belongs_to :member
  has_many :member_order_items, dependent: :destroy
  acts_as_paranoid

  def created_date
    created_at.to_date
  end

  def as_json_list
    as_json(
      only: %i[type amount points_amount remark uuid created_at savings_amount],
      methods: %i[created_date]
    )
  end
end
