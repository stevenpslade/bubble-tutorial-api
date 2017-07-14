module Api::V1
  class SitesController < BaseApiController
    # before_action :authenticate_api_v1_user
    before_action :set_site, only: [:show, :update, :destroy]

    # GET /sites
    def index
      @sites = Site.all

      render json: @sites
    end

    # GET /sites/1
    def show
      render json: @site, include:  ['tutorials', 'tutorial_items']
    end

    # POST /sites
    def create
      @site = Site.new(site_params)

      if @site.save
        render json: @site, status: :created, location: v1_site_url(@site)
      else
        render json: @site.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /sites/1
    def update
      if @site.update(site_params)
        render json: @site
      else
        render json: @site.errors, status: :unprocessable_entity
      end
    end

    # DELETE /sites/1
    def destroy
      @site.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_site
        @site = Site.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def site_params
        params.require(:site).permit(:url, :site_code, :user_id)
      end
  end
end
