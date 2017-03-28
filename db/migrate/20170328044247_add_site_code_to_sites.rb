class AddSiteCodeToSites < ActiveRecord::Migration[5.0]
  def change
    add_column :sites, :site_code, :integer
  end
end
