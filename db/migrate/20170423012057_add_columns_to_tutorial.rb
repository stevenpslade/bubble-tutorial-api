class AddColumnsToTutorial < ActiveRecord::Migration[5.0]
  def change
    add_column :tutorials, :page_url, :string
    add_column :tutorials, :skippable, :boolean
    add_column :tutorials, :show_steps, :boolean
  end
end
