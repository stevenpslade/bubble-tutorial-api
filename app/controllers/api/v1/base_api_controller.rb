module Api::V1
  class BaseApiController < ApplicationController
    include Knock::Authenticable
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_rescue

    before_action :authenticate_user

    private
    
    def record_not_found_rescue(exception)
      logger.info("#{exception.class}: " + exception.message)
      if Rails.env.production?
        render json: { status: 404, errors: 'Not found' }, status: :not_found
      else
        render json: { status: 404, errors: 'Not found', message: exception, backtrace: exception.backtrace }, status: :not_found
      end
    end

  end
end
