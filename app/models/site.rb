class Site < ApplicationRecord
  has_many :tutorials
  belongs_to :user
end
