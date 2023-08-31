class CreateMemberOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :member_orders do |t|
      t.uuid :uuid, null: false, default: 'gen_random_uuid()'
      t.string :type, null: false
      t.decimal :amount, precision: 12, scale: 2, default: '0.0'
      t.integer :points_amount, default: 0
      t.references :member, null: false, foreign_key: true
      t.string :remark
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :member_order_items do |t|
      t.references :member_order, null: false, foreign_key: true
      t.integer :item_type
      t.integer :item_id
      t.datetime :deleted_at

      t.timestamps
    end

    create_table :coupons do |t|
      t.uuid :uuid, null: false, default: 'gen_random_uuid()'
      t.references :member, null: false, foreign_key: true
      t.string :type, null: false
      t.integer :status, null: false, default: 0
      t.date :expires_at
      t.decimal :threshold, precision: 12, scale: 2, default: '0.0', comment: '阈值'
      t.decimal :discount, precision: 12, scale: 2, default: '0.0', comment: '折扣'

      t.timestamps
    end

    create_table :points do |t|
      t.uuid :uuid, null: false, default: 'gen_random_uuid()'
      t.references :member, null: false, foreign_key: true
      t.integer :available_amount, default: 0
      t.integer :used_amount, default: 0
      t.date :expires_at

      t.timestamps
    end

    rename_column :members, :points, :points_count
  end
end
