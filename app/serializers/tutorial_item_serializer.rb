class TutorialItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :active
  has_one :tutorial
end
