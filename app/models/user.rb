class User < ApplicationRecord
  has_many :tutorials, dependent: :destroy
  has_many :sites, through: :tutorials, dependent: :destroy
end
