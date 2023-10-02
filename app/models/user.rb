class User < ApplicationRecord
  include InvitationConcern
  include BiDataOfUser
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable
  before_create :set_max_members_count, :set_seed

  has_many :members
  has_many :member_orders, through: :members
  has_many :consumption_member_orders, through: :members
  has_many :recharge_member_orders, through: :members
  has_many :orders

  def as_json_list
    as_json(
      only: %i[phone name birthday max_members_count members_count seed]
    )
  end

  private

  def set_max_members_count
    self.max_members_count = 3
  end

  def set_seed
    # 设置种子用户
    self.seed = true
  end
end
