require 'rails_helper'

RSpec.describe "Sites", type: :request do

  let!(:user) { create(:user) }
  let!(:sites) { create_list(:site, 10, user_id: user.id) }
  let(:user_id) { user.id }
  let(:id) { sites.first.id }

  describe "GET /v1/sites" do

    # make HTTP get request before each example
    before { get v1_sites_path }

    it "returns sites" do
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(10)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  describe "GET /v1/sites/:id" do

    before { get v1_site_path(id) }

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
        expect(response.body).to match(/Couldn't find Site/)
      end
    end
  end

  describe "POST /v1/sites" do

    let(:valid_attributes) { { "site"=>{"url"=>"www.example.com", "user_id"=>user_id, "site_code"=>"123456"} } }
    let(:invalid_attributes) { { "site"=>{"url"=>"", "user_id"=>user_id, "site_code"=>"123456"} } }

    context 'when the request is valid' do
      before { post v1_sites_path, params: valid_attributes }

      it 'creates a site' do
        expect(json['data']['attributes']['url']).to eq("www.example.com")
        expect(json['data']['attributes']['site_code']).to eq("123456")
        expect(json['data']['relationships']['user']['data']['id'].to_i).to eq(user_id)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post v1_sites_path, params: invalid_attributes }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /v1/sites/:id' do
    let(:valid_attributes) { { "site"=>{"url"=>"www.updated.com"} } }

    context 'when the record exists' do
      before { put v1_site_path(id), params: valid_attributes }

      it 'updates the record' do
        expect(json['data']['attributes']['url']).to eq("www.updated.com")
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /sites/:id' do
    before { delete v1_site_path(id) }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end