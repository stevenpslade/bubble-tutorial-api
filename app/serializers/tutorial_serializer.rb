class TutorialSerializer < ActiveModel::Serializer
  attributes :id, :name, :active
  has_one :user
  has_one :site
end
