# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170423013202) do

  create_table "sites", force: :cascade do |t|
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.string   "site_code"
    t.index ["user_id"], name: "index_sites_on_user_id"
  end

  create_table "tutorial_items", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.boolean  "active"
    t.integer  "tutorial_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "order"
    t.string   "css_selector"
    t.index ["tutorial_id"], name: "index_tutorial_items_on_tutorial_id"
  end

  create_table "tutorials", force: :cascade do |t|
    t.string   "name"
    t.boolean  "active"
    t.integer  "user_id"
    t.integer  "site_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "page_url"
    t.boolean  "skippable"
    t.boolean  "show_steps"
    t.index ["site_id"], name: "index_tutorials_on_site_id"
    t.index ["user_id"], name: "index_tutorials_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
