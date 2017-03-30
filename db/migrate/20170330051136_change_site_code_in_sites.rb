class ChangeSiteCodeInSites < ActiveRecord::Migration[5.0]
  def change
    change_column :sites, :site_code, :string
  end
end
