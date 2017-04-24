class TutorialItem < ApplicationRecord
  belongs_to :tutorial

  validates :title, :content, :css_selector, presence: true
  validates :active, exclusion: { in: [nil] }
end
