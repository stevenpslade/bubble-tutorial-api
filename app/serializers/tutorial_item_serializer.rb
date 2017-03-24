class TutorialItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :active, :created_at
  belongs_to :tutorial
end
