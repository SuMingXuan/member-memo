class AddTotalConsumptionAmountToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :total_consumption_amount, :decimal, precision: 12, scale: 2, default: '0.0'
    add_column :members, :total_recharge_amount, :decimal, precision: 12, scale: 2, default: '0.0'
  end
end
