class Site < ApplicationRecord
  has_many :tutorials
  has_many :users, through: :tutorials
end
