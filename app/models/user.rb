class User < ApplicationRecord
  has_many :tutorials, dependent: :destroy
  has_many :sites, dependent: :destroy

  validates :email, presence: true
end
