module Api::V1
  class UsersController < BaseApiController
    skip_before_action :authenticate_user, only: :create
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.all

      render json: @users
    end

    # GET /users/1
    def show
      render json: @user
    end

    # POST /users
    def create
      @user = User.new(user_params)

      if @user.save
        token = authenticate_on_create(@user.id)

        render json: @user, status: :created, location: v1_user_url(@user), auth_token: token
      else
        render json: { errors: @user.errors }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      @user.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      def authenticate_on_create(user_id)
        # Create the token
        knock_token = Knock::AuthToken.new payload: { sub: user_id }
        # Access the JWT token
        knock_token.token
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
  end
end
