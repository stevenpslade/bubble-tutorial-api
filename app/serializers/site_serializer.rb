class SiteSerializer < ActiveModel::Serializer
  attributes :id, :url, :site_code, :created_at
  has_many :tutorials
  belongs_to :user
end
