class TutorialSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :site
  has_many :tutorial_items, dependent: :destroy, serializer: TutorialItemSerializer

  attributes :id, :name, :active, :page_url, :skippable, :show_steps
end
