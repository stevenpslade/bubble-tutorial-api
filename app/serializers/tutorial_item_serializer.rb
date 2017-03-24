class TutorialItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :active, :created_at
  has_one :tutorial
end
