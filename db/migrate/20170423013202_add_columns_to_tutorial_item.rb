class AddColumnsToTutorialItem < ActiveRecord::Migration[5.0]
  def change
    add_column :tutorial_items, :order, :integer
    add_column :tutorial_items, :css_selector, :string
  end
end
