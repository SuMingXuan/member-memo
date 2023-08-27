class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.uuid        :uuid, default: 'gen_random_uuid()', null: false
      t.string      :card_number
      t.string      :level
      t.date        :birthday
      t.date        :expires_at
      t.string      :store_name
      t.string      :store_address
      t.string      :store_image_url
      t.integer     :theme, default: 0
      t.string      :activity_rules
      t.integer     :coupons_count,                    default: 0
      t.integer     :points,                           default: 0
      t.decimal     :balance, precision: 12, scale: 2, default: '0.0'

      t.references  :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
