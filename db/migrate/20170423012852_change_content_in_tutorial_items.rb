class ChangeContentInTutorialItems < ActiveRecord::Migration[5.0]
  def change
    change_column :tutorial_items, :content, :text
  end
end
