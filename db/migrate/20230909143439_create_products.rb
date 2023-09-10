class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :count
      t.integer :status, default: 0
      t.decimal :price, precision: 12, scale: 2, default: '0.0'

      t.timestamps
    end
  end
end
