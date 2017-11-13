class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at
  attribute :auth_token, if: :auth_token?

  has_many :tutorials, dependent: :destroy
  has_many :sites, through: :tutorials, dependent: :destroy

  def auth_token
    @instance_options[:auth_token]
  end

  def auth_token?
    true if @instance_options[:auth_token]
  end
end
