class AddSeedToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :seed, :boolean, comment: '是否为种子用户'
    add_column :members, :status, :integer, default: 0, comment: '0:常用, 1:不常用'
  end
end
