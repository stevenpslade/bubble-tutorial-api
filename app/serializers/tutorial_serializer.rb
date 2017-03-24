class TutorialSerializer < ActiveModel::Serializer
  attributes :id, :name, :active, :created_at
  has_one :user
  has_one :site
end
