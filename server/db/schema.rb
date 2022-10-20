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
  create_table "active_storage_attachments", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "addresses", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "is_default", default: false, null: false
    t.string "city"
    t.string "county"
    t.string "street"
    t.string "apartment_number"
    t.string "description"
    t.string "name"
    t.string "phone"
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
    t.string "description"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_category_on_name", unique: true
  end

  create_table "order_histories", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "order_status_before"
    t.string "order_status_after"
    t.string "description"
    t.bigint "order_id"
    t.bigint "executor_id"
    t.string "executor_type"
    t.integer "user_type"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id", "executor_id", "executor_type"], name: "index_order_histories_on_order_id_executor_id_executor_type"
  end

  create_table "order_items", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "order_id"
    t.bigint "product_id"
    t.integer "quantity"
    t.string "description"
    t.bigint "total"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "seller_id"
    t.bigint "shipper_id"
    t.bigint "address_id"
    t.integer "status", default: 0, null: false
    t.bigint "shipping_fee", default: 0, null: false
    t.bigint "total", default: 0, null: false
    t.bigint "discount", default: 0, null: false
    t.bigint "subtotal", default: 0, null: false
    t.string "number", null: false
    t.datetime "ordered_at"
    t.integer "payment_method", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_orders_on_address_id"
    t.index ["ordered_at"], name: "index_orders_on_ordered_at"
    t.index ["user_id"], name: "index_orders_on_user_id"
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
    t.integer "quantity", default: 0, null: false
    t.boolean "is_display", default: true, null: false
    t.bigint "trademark_id"
    t.integer "total_cancel", default: 0, null: false
    t.integer "total_return", default: 0, null: false
    t.integer "lock_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "creator_id", "creator_type"], name: "index_products_on_name_creator_id_creator_type", unique: true
    t.index ["number", "creator_id", "creator_type"], name: "index_products_on_number_creator_id_creator_type", unique: true
  end

  create_table "species", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_species_on_name", unique: true
  end

  create_table "trademarks", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.bigint "category_id", null: false
    t.bigint "species_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_species_on_name"
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
    t.bigint "shipping_fee", default: 0, null: false
    t.string "store_name"
    t.datetime "deleted_at"
    t.integer "lock_version", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
