class Tutorial < ApplicationRecord
  belongs_to :user
  belongs_to :site
  has_many :tutorial_items, dependent: :destroy

  validates :name, :page_url, presence: true
  validates :active, :skippable, :show_steps, exclusion: { in: [nil] }
end
