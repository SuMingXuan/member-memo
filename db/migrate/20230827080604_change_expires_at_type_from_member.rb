class ChangeExpiresAtTypeFromMember < ActiveRecord::Migration[7.0]
  def change
    change_column :members, :expires_at, :date
  end
end
