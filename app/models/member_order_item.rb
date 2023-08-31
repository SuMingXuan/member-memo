class MemberOrderItem < ApplicationRecord
  belongs_to :member_order
  belongs_to :item, polymorphic: true
  acts_as_paranoid
end
