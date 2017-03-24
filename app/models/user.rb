class User < ApplicationRecord
  has_many :tutorials
  has_many :sites, through: :tutorials
end
