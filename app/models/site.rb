class Site < ApplicationRecord
  has_many :tutorials
  belongs_to :user

  validates :url, :site_code, presence: true
  validates :site_code, uniqueness: true
end
