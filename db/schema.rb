# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_04_034240) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coupons", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.bigint "member_id", null: false
    t.string "type", null: false
    t.integer "status", default: 0, null: false
    t.date "expires_at"
    t.decimal "threshold", precision: 12, scale: 2, default: "0.0", comment: "阈值"
    t.decimal "discount", precision: 12, scale: 2, default: "0.0", comment: "折扣"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_coupons_on_member_id"
  end

  create_table "member_order_items", force: :cascade do |t|
    t.bigint "member_order_id", null: false
    t.integer "item_type"
    t.integer "item_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_order_id"], name: "index_member_order_items_on_member_order_id"
  end

  create_table "member_orders", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "type", null: false
    t.decimal "amount", precision: 12, scale: 2, default: "0.0"
    t.integer "points_amount", default: 0
    t.bigint "member_id", null: false
    t.string "remark"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "savings_amount", precision: 12, scale: 2, default: "0.0"
    t.decimal "after_balance", precision: 12, scale: 2, default: "0.0"
    t.decimal "after_points_amount", precision: 12, scale: 2, default: "0.0"
    t.index ["member_id"], name: "index_member_orders_on_member_id"
  end

  create_table "members", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "card_number"
    t.string "level"
    t.date "birthday"
    t.date "expires_at"
    t.string "store_name"
    t.string "store_address"
    t.string "store_image_url"
    t.integer "theme", default: 0
    t.string "activity_rules"
    t.integer "coupons_count", default: 0
    t.decimal "points_count", precision: 12, scale: 2, default: "0.0"
    t.decimal "balance", precision: 12, scale: 2, default: "0.0"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.decimal "discount", precision: 12, scale: 2, default: "10.0"
    t.decimal "total_savings_amount", precision: 12, scale: 2, default: "0.0"
    t.decimal "total_consumption_amount", precision: 12, scale: 2, default: "0.0"
    t.decimal "total_recharge_amount", precision: 12, scale: 2, default: "0.0"
    t.integer "status", default: 0, comment: "0:常用, 1:不常用"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "user_id", null: false
    t.decimal "payment_amount", precision: 12, scale: 2, default: "0.0"
    t.string "order_no", null: false
    t.integer "status", default: 0, comment: "订单状态, 0:充值中, 1:充值成功, 2:充值失败"
    t.integer "payment_method", default: 0, comment: "支付方式, 0:支付宝, 1:微信"
    t.integer "payment_scene", default: 0, comment: "支付场景, 0:pc, 1:h5"
    t.json "callback_data", default: {}, comment: "支付完成后，回调里面的信息"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_orders_on_product_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "points", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.bigint "member_id", null: false
    t.integer "available_amount", default: 0
    t.integer "used_amount", default: 0
    t.date "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_points_on_member_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "count"
    t.integer "status", default: 0
    t.decimal "price", precision: 12, scale: 2, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "uuid"
  end

  create_table "users", force: :cascade do |t|
    t.string "phone", default: "", null: false
    t.string "name", default: "", null: false
    t.date "birthday"
    t.string "encrypted_password"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "members_count", default: 0
    t.integer "max_members_count", default: 5
    t.string "invitation_code"
    t.string "code"
    t.boolean "seed", comment: "是否为种子用户"
    t.index ["code"], name: "index_users_on_code", unique: true
    t.index ["invitation_code"], name: "index_users_on_invitation_code"
    t.index ["phone"], name: "index_users_on_phone", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "coupons", "members"
  add_foreign_key "member_order_items", "member_orders"
  add_foreign_key "member_orders", "members"
  add_foreign_key "members", "users"
  add_foreign_key "orders", "products"
  add_foreign_key "orders", "users"
  add_foreign_key "points", "members"
end
