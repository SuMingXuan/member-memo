class AddColumnsToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :deleted_at, :datetime
  end
end
