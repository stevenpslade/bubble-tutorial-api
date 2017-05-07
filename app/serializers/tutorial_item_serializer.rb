class TutorialItemSerializer < ActiveModel::Serializer
  belongs_to :tutorial

  attributes :id, :title, :content, :active, :css_selector, :order, :created_at
end
