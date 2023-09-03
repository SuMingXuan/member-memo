class Coupon < ApplicationRecord
  enum status: { unused: 0, used: 1, expired: 2 }

  validates :threshold, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :discount, presence: true, numericality: { greater_than_or_equal_to: 0 }

  belongs_to :member, counter_cache: true
  has_many :member_order_items, as: :item

  scope :available, -> { where(status: :unused).where('expires_at > ?', Time.now) }

  def as_json_list
    as_json(only: %i[type threshold discount])
  end
end
