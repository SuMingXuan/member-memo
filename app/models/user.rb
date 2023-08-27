class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :trackable

  has_many :members

  def user_info_json
    as_json(only: %i[phone name birthday])
  end
end
