class User < ApplicationRecord
  has_secure_password
  
  has_many :tutorials, dependent: :destroy
  has_many :sites, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

end
