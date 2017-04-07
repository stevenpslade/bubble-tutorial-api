require 'rails_helper'

RSpec.describe "Tutorials", type: :request do

  let!(:user) { create(:user) }
  let!(:site) { create(:site) }
  let!(:user_id) { user.id }
  let!(:site_id) { site.id }
  let!(:tutorials) { create_list(:tutorial, 10, user_id: user_id, site_id: site_id) }


  describe "GET /v1/sites/:site_id/tutorials" do
    
    before { get v1_site_tutorials_path }

    it "returns tutorials" do
    end

    it "returns status code 200" do
    end
  end

  describe "GET v1/sites/:site_id/tutorials/:id" do

    before { get v1_site_tutorial_path(id) }

    context "when the record exists" do
      it "returns the site" do
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
        expect(response.body).to match(/Couldn't find Tutorial/)
      end
    end
  end

  describe "POST v1/sites/:site_id/tutorials" do

    let(:valid_attributes) { { "tutorial"=>{"name"=>"Best Tutorial", "active"=>true, "user_id"=>user_id, "site_id"=>site_id} } }
    let(:invalid_attributes) { { "tutorial"=>{"name"=>"", "user_id"=>user_id, "site_id"=>site_id} } }

    context 'when the request is valid' do
      before { post v1_site_tutorials_path, params: valid_attributes }

      it 'creates a site' do
        expect(json['data']['attributes']['name']).to eq("Best Tutorial")
        expect(json['data']['attributes']['active']).to eq(true)
        expect(json['data']['relationships']['site']['data']['id'].to_i).to eq(site_id)
        expect(json['data']['relationships']['user']['data']['id'].to_i).to eq(user_id)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post v1_site_tutorials_path, params: invalid_attributes }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can't be blank/)
      end
    end
  end

  describe "PUT v1/sites/:site_id/tutorials/:id" do
    let(:valid_attributes) { { "tutorial"=>{"name"=>"Best Updated Tutorial"} } }

    context 'when the record exists' do
      before { put v1_site_tutorial_path(id), params: valid_attributes }

      it 'updates the record' do
        expect(json['data']['attributes']['name']).to eq("www.updated.com")
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE v1/sites/:site_id/tutorials/:id" do
    before { delete v1_site_tutorial_path(id) }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
