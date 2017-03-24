class CreateTutorialItems < ActiveRecord::Migration[5.0]
  def change
    create_table :tutorial_items do |t|
      t.string :title
      t.string :content
      t.boolean :active
      t.references :tutorial, foreign_key: true

      t.timestamps
    end
  end
end
