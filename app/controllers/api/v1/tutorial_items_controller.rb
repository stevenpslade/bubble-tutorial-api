module Api::V1
  class TutorialItemsController < BaseApiController
    before_action :set_tutorial_item, only: [:show, :update, :destroy]

    # GET /tutorial_items
    def index
      @tutorial_items = TutorialItem.all

      render json: @tutorial_items
    end

    # GET /tutorial_items/1
    def show
      render json: @tutorial_item
    end

    # POST /tutorial_items
    def create
      @tutorial_item = TutorialItem.new(tutorial_item_params)

      if @tutorial_item.save
        render json: @tutorial_item, status: :created, location: v1_tutorial_item_url(@tutorial_item)
      else
        render json: { errors: @tutorial_item.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /tutorial_items/1
    def update
      if @tutorial_item.update(tutorial_item_params)
        render json: @tutorial_item
      else
        render json: { errors: @tutorial_item.errors }, status: :unprocessable_entity
      end
    end

    # DELETE /tutorial_items/1
    def destroy
      @tutorial_item.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_tutorial_item
        @tutorial_item = TutorialItem.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def tutorial_item_params
        params.require(:tutorial_item).permit(:title, :content, :order, :css_selector, :active, :tutorial_id)
      end
  end
end
