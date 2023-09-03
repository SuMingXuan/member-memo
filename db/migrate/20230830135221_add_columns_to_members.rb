class AddColumnsToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :deleted_at, :datetime
    add_column :members, :discount, :decimal, precision: 12, scale: 2, default: '1.0'
  end
end
