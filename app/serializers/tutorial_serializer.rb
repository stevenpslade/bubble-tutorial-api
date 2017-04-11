class TutorialSerializer < ActiveModel::Serializer
  attributes :id, :name, :active, :tutorial_items
  belongs_to :user
  belongs_to :site
  has_many :tutorial_items, dependent: :destroy
end
