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

ActiveRecord::Schema[7.0].define(version: 0) do
  create_table "addresses", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "is_default", default: false, null: false
    t.string "city"
    t.string "county"
    t.string "street"
    t.string "apartment_number"
    t.string "description"
    t.integer "lock_version", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_adresses_on_user_id"
  end

  create_table "admins", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.integer "lock_version", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.boolean "is_logout", default: false, null: false
    t.index ["email"], name: "index_admin_on_email", unique: true
  end

  create_table "categories", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_category_on_name", unique: true
  end

  create_table "order_items", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "order_id"
    t.bigint "product_id"
    t.integer "quantity"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "address_id"
    t.integer "status", default: 0, null: false
    t.bigint "shipping_fee", default: 0, null: false
    t.bigint "total", default: 0, null: false
    t.bigint "tax", default: 0, null: false
    t.bigint "discount", default: 0, null: false
    t.bigint "subtotal", default: 0, null: false
    t.string "number", null: false
    t.datetime "ordered_at"
    t.integer "payment_method", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ordered_at"], name: "index_orders_on_ordered_at"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "product_categories", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "category_id"], name: "index_pc_on_user_id_category_id", unique: true
  end

  create_table "products", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "number", null: false
    t.string "name", null: false
    t.integer "master_list_price"
    t.integer "master_sales_price"
    t.string "master_sku"
    t.bigint "creator_id"
    t.string "creator_type"
    t.string "description"
    t.bigint "number_of_items_sold", default: 0, null: false
    t.integer "lock_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "creator_id", "creator_type"], name: "index_products_on_name_creator_id_creator_type", unique: true
    t.index ["number", "creator_id", "creator_type"], name: "index_products_on_number_creator_id_creator_type", unique: true
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "email", null: false
    t.string "name", null: false
    t.string "encrypted_password", null: false
    t.string "email_verification_token"
    t.datetime "email_verification_token_valid_datetime"
    t.datetime "email_verified_at"
    t.string "phone"
    t.string "address"
    t.integer "point", default: 0
    t.integer "sex_id"
    t.date "birthday"
    t.integer "user_type", default: 1
    t.boolean "is_active", default: false, null: false
    t.string "password_reset_token"
    t.datetime "password_reset_token_valid_datetime"
    t.boolean "is_logout", default: false, null: false
    t.datetime "deleted_at"
    t.integer "lock_version", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
