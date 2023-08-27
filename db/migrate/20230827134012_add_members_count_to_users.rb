class AddMembersCountToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :members_count,      :integer, default: 0
    add_column :users, :max_members_count,  :integer, default: 10
  end
end
