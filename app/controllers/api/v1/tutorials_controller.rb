module Api::V1
  class TutorialsController < BaseApiController
    before_action :set_tutorial, only: [:show, :update, :destroy]

    # GET /tutorials
    def index
      @tutorials = Tutorial.all

      render json: @tutorials, include: ['site', 'tutorial_items']
    end

    # GET /tutorials/1
    def show
      render json: @tutorial, include: ['tutorial_items']
    end

    # POST /tutorials
    def create
      @tutorial = Tutorial.new(tutorial_params)
      @site = Site.find(params[:site_id]) 

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
      # Use callbacks to share common setup or constraints between actions.
      def set_tutorial
        @tutorial = Tutorial.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def tutorial_params
        params.require(:tutorial).permit(:name, :active, :user_id, :site_id)
      end
  end
end
