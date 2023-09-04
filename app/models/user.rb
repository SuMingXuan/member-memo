class User < ApplicationRecord
  include InvitationConcern
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable

  has_many :members

  def as_json_list
    as_json(only: %i[phone name birthday])
  end
end
