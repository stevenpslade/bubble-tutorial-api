require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe Api::V1::TutorialItemsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # TutorialItem. As you add validations to TutorialItem, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # TutorialItemsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all tutorial_items as @tutorial_items" do
      tutorial_item = TutorialItem.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(assigns(:tutorial_items)).to eq([tutorial_item])
    end
  end

  describe "GET #show" do
    it "assigns the requested tutorial_item as @tutorial_item" do
      tutorial_item = TutorialItem.create! valid_attributes
      get :show, params: {id: tutorial_item.to_param}, session: valid_session
      expect(assigns(:tutorial_item)).to eq(tutorial_item)
    end
  end

  describe "GET #new" do
    it "assigns a new tutorial_item as @tutorial_item" do
      get :new, params: {}, session: valid_session
      expect(assigns(:tutorial_item)).to be_a_new(TutorialItem)
    end
  end

  describe "GET #edit" do
    it "assigns the requested tutorial_item as @tutorial_item" do
      tutorial_item = TutorialItem.create! valid_attributes
      get :edit, params: {id: tutorial_item.to_param}, session: valid_session
      expect(assigns(:tutorial_item)).to eq(tutorial_item)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new TutorialItem" do
        expect {
          post :create, params: {tutorial_item: valid_attributes}, session: valid_session
        }.to change(TutorialItem, :count).by(1)
      end

      it "assigns a newly created tutorial_item as @tutorial_item" do
        post :create, params: {tutorial_item: valid_attributes}, session: valid_session
        expect(assigns(:tutorial_item)).to be_a(TutorialItem)
        expect(assigns(:tutorial_item)).to be_persisted
      end

      it "redirects to the created tutorial_item" do
        post :create, params: {tutorial_item: valid_attributes}, session: valid_session
        expect(response).to redirect_to(TutorialItem.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved tutorial_item as @tutorial_item" do
        post :create, params: {tutorial_item: invalid_attributes}, session: valid_session
        expect(assigns(:tutorial_item)).to be_a_new(TutorialItem)
      end

      it "re-renders the 'new' template" do
        post :create, params: {tutorial_item: invalid_attributes}, session: valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested tutorial_item" do
        tutorial_item = TutorialItem.create! valid_attributes
        put :update, params: {id: tutorial_item.to_param, tutorial_item: new_attributes}, session: valid_session
        tutorial_item.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested tutorial_item as @tutorial_item" do
        tutorial_item = TutorialItem.create! valid_attributes
        put :update, params: {id: tutorial_item.to_param, tutorial_item: valid_attributes}, session: valid_session
        expect(assigns(:tutorial_item)).to eq(tutorial_item)
      end

      it "redirects to the tutorial_item" do
        tutorial_item = TutorialItem.create! valid_attributes
        put :update, params: {id: tutorial_item.to_param, tutorial_item: valid_attributes}, session: valid_session
        expect(response).to redirect_to(tutorial_item)
      end
    end

    context "with invalid params" do
      it "assigns the tutorial_item as @tutorial_item" do
        tutorial_item = TutorialItem.create! valid_attributes
        put :update, params: {id: tutorial_item.to_param, tutorial_item: invalid_attributes}, session: valid_session
        expect(assigns(:tutorial_item)).to eq(tutorial_item)
      end

      it "re-renders the 'edit' template" do
        tutorial_item = TutorialItem.create! valid_attributes
        put :update, params: {id: tutorial_item.to_param, tutorial_item: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested tutorial_item" do
      tutorial_item = TutorialItem.create! valid_attributes
      expect {
        delete :destroy, params: {id: tutorial_item.to_param}, session: valid_session
      }.to change(TutorialItem, :count).by(-1)
    end

    it "redirects to the tutorial_items list" do
      tutorial_item = TutorialItem.create! valid_attributes
      delete :destroy, params: {id: tutorial_item.to_param}, session: valid_session
      expect(response).to redirect_to(tutorial_items_url)
    end
  end

end