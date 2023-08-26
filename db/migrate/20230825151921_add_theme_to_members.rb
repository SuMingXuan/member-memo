class AddThemeToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :theme, :integer, default: 0, null: false
  end
end
