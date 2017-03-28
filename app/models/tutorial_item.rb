class TutorialItem < ApplicationRecord
  belongs_to :tutorial

  validates :title, presence: true
  validates :content, presence: true
  validates :active, exclusion: { in: [nil] }
end
