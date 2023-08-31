class MemberOrder < ApplicationRecord
  belongs_to :member
  has_many :member_order_items, dependent: :destroy
  acts_as_paranoid
end
