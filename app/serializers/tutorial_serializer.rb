class TutorialSerializer < ActiveModel::Serializer
  attributes :id, :name, :active
  belongs_to :user
  belongs_to :site
  has_many :tutorial_items, dependent: :destroy
end
