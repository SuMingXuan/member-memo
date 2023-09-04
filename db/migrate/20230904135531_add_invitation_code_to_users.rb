class AddInvitationCodeToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :invitation_code, :string
    add_column :users, :code, :string
    add_index :users, :code, unique: true
    add_index :users, :invitation_code

    change_column :users, :max_members_count, :integer, default: 5
  end
end
