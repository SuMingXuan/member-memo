class AddUuidToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :uuid, :uuid
  end
end
