class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at
  has_many :tutorials, dependent: :destroy
  has_many :sites, through: :tutorials, dependent: :destroy
end
