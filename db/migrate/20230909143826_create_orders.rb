class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :product, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.decimal :payment_amount, precision: 12, scale: 2, default: '0.0'

      t.timestamps
    end
  end
end
