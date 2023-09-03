class ChangeColumnsFromMembers < ActiveRecord::Migration[7.0]
  def up
    change_column :members, :points_count, :decimal, precision: 12, scale: 2, default: '0.0'
    change_column :members, :discount, :decimal, precision: 12, scale: 2, default: '10'
    add_column :members, :total_savings_amount, :decimal, precision: 12, scale: 2, default: '0'
  end

  def down
    change_column :members, :points_count, :integer
    change_column :members, :discount, :decimal, precision: 12, scale: 2, default: '1.0'
    remove_column :members, :total_savings_amount
  end
end
