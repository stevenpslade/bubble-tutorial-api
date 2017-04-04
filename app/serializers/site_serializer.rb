class SiteSerializer < ActiveModel::Serializer
  attributes :id, :url, :site_code
  has_many :tutorials
  belongs_to :user
end
