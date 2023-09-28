class Order < ApplicationRecord
  include OrderNoConcern
  enum status: { pending: 0, success: 1, fail: 2 }
  enum payment_method: { ali: 0, wechat: 1 }
  enum payment_scene: { pc: 0, h5: 1 }

  belongs_to :product
  belongs_to :user
end
