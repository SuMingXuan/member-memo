class User < ApplicationRecord
  include InvitationConcern
  include BiDataOfUser
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable

  has_many :members
  has_many :member_orders, through: :members
  has_many :consumption_member_orders, through: :members
  has_many :recharge_member_orders, through: :members

  def as_json_list
    as_json(
      only: %i[phone name birthday max_members_count members_count]
    )
  end
end
