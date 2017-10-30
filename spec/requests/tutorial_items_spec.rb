require 'rails_helper'

RSpec.describe "TutorialItems", type: :request do

  let!(:user) { create(:user) }
  let!(:user_id) { user.id }
  let!(:site) { create(:site, user_id: user_id) }
  let!(:site_id) { site.id }
  let!(:tutorial) { create(:tutorial, user_id: user_id, site_id: site_id) }
  let!(:tutorial_id) { tutorial.id }
  let!(:tutorial_items) { create_list(:tutorial_item, 10, tutorial_id: tutorial_id) }
  let!(:id) { tutorial_items.first.id }


  describe "GET /v1/tutorial_items" do

    before { get v1_tutorial_items_path, headers: authenticated_header(user) }

    it "returns tutorial items" do
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(10)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /v1/tutorial_items/:id" do

    before { get v1_tutorial_item_path(id), headers: authenticated_header(user) }

    context "when the record exists" do
      it "returns the tutorial item" do
        expect(json['data']).not_to be_empty
        expect(json['data']['id']).to eq(id.to_s)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find TutorialItem/)
      end
    end
  end

  describe "POST /v1/tutorial_items" do

    let(:valid_attributes) { { "tutorial_item"=>{"title"=>"Step1", "content"=>"this is content blah", "order"=>1, "css_selector"=>"#myDiv", "active"=>true, "tutorial_id"=>tutorial_id} } }
    let(:invalid_attributes) { { "tutorial_item"=>{"title"=>"", "content"=>"", "active"=>true, "tutorial_id"=>tutorial_id} } }

    context 'when the request is valid' do
      before { post v1_tutorial_items_path, params: valid_attributes, headers: authenticated_header(user) }

      it 'creates a tutorial item' do
        expect(json['data']['attributes']['title']).to eq("Step1")
        expect(json['data']['attributes']['content']).to eq("this is content blah")
        expect(json['data']['relationships']['tutorial']['data']['id'].to_i).to eq(tutorial_id)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post v1_tutorial_items_path, params: invalid_attributes, headers: authenticated_header(user) }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /v1/tutorial_items/:id' do
    let(:valid_attributes) { { "tutorial_item"=>{"title"=>"Updated Step"} } }

    context 'when the record exists' do
      before { put v1_tutorial_item_path(id), params: valid_attributes, headers: authenticated_header(user) }

      it 'updates the record' do
        expect(json['data']['attributes']['title']).to eq("Updated Step")
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /tutorial_item/:id' do
    before { delete v1_tutorial_item_path(id), headers: authenticated_header(user) }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
