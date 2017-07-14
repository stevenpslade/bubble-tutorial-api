class ApplicationController < ActionController::API
  include Knock::Authenticable

  private

  def authenticate_api_v1_user
    authenticate_for Api::V1::User
  end
end
