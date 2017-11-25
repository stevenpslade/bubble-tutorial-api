module Api::V1
  class TutorialsController < BaseApiController
    skip_before_action :authenticate_user, only: :index
    before_action :validate_site_origin, only: :index
    before_action :set_site
    before_action :set_tutorial, only: [:show, :update, :destroy]

    # GET /tutorials
    def index
      @tutorials = Tutorial.active_only(params[:site_id])

      render json: @tutorials, include: ['tutorial_items'] 
    end

    # GET /tutorials/1
    def show
      render json: @tutorial
    end

    # POST /tutorials
    def create
      @tutorial = @site.tutorials.new(tutorial_params)

      if @tutorial.save
        render json: @tutorial, status: :created, location: v1_site_tutorial_url(@site, @tutorial)
      else
        render json: @tutorial.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /tutorials/1
    def update
      if @tutorial.update(tutorial_params)
        render json: @tutorial
      else
        render json: @tutorial.errors, status: :unprocessable_entity
      end
    end

    # DELETE /tutorials/1
    def destroy
      @tutorial.destroy
    end

    private

      def validate_site_origin
        site_url = Site.find(params[:site_id]).url

        if request.origin != site_url || current_user
          render json: { status: 403, errors: 'Not Authorized' }, status: 403
        end
      end
      # Use callbacks to share common setup or constraints between actions.
      def set_tutorial
        @tutorial = Tutorial.find(params[:id])
      end

      def set_site
        @site = Site.find(params[:site_id])
      end

      # Only allow a trusted parameter "white list" through.
      def tutorial_params
        params.require(:tutorial).permit(:name, :active, :page_url, :skippable, :show_steps, :user_id, tutorial_items_attributes: [ :id, :title, :content, :order, :css_selector, :active ])
      end
  end
end
