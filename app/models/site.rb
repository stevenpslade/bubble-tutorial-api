class Site < ApplicationRecord
  has_many :tutorials
  belongs_to :user

  validates :url, presence: true, uniqueness: true
end
