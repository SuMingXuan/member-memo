class AddAfterAmountToMemberOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :member_orders, :after_balance, :decimal, precision: 12, scale: 2, default: '0.0'
    add_column :member_orders, :after_points_amount, :decimal, precision: 12, scale: 2, default: '0.0'
  end
end
