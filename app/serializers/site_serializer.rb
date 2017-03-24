class SiteSerializer < ActiveModel::Serializer
  attributes :id, :url, :created_at
  has_many :tutorials
  has_many :users, through: :tutorials
end
