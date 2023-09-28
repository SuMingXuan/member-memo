class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :product, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.decimal :payment_amount, precision: 12, scale: 2, default: '0.0'
      t.string :order_no, null: false
      t.integer :status, default: 0, comment: '订单状态, 0:充值中, 1:充值成功, 2:充值失败'
      t.integer :payment_method, default: 0, comment: '支付方式, 0:支付宝, 1:微信'
      t.integer :payment_scene, default: 0, comment: '支付场景, 0:pc, 1:h5'
      t.json :callback_data, default: {}, comment: '支付完成后，回调里面的信息'

      t.timestamps
    end
  end
end
