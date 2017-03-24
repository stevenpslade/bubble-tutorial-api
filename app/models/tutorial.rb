class Tutorial < ApplicationRecord
  belongs_to :user
  belongs_to :site
  has_many :tutorial_items, dependent: :destroy
end
