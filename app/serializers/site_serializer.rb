class SiteSerializer < ActiveModel::Serializer
  attributes :id, :url, :created_at
end
