require 'rails_helper'

RSpec.describe "Tutorials", type: :request do

  let!(:user) { create(:user) }
  let!(:user_id) { user.id }
  let!(:site) { create(:site, user_id: user_id) }
  let!(:site_id) { site.id }
  let!(:tutorials) { create_list(:tutorial, 10, user_id: user_id, site_id: site_id) }
  let!(:id) { tutorials.first.id }
  let!(:tutorial_items) { create_list(:tutorial_item, 5, tutorial_id: tutorials.first.id) }

  describe "GET /v1/sites/:site_id/tutorials" do
    # TODO: figure out how to pass http origin to rspec test but also not pass it correctly
    # in the second context. Also why was request.origin working at first but now it is not!
    before { get v1_site_tutorials_path(site_id), headers: { Origin: "http://api.example.com" } }

    context "when the request domain matches the site url" do
      let(:site_url) { "http://api.example.com" }
      let(:origin) { request.origin }

      it "matches the site url with the request domain" do
        expect(origin).to eq(site_url)
      end

      it "returns tutorials" do
        expect(json['data']).not_to be_empty
        expect(json['data'].size).to eq(10)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when the request domain does not match the site url" do
      let(:fake_site) { create(:site, user_id: user_id) }
      # Should be http://example.com as per site factory
      let(:site_url) { site.url }

      it "returns status code 403" do
        expect(response).to have_http_status(403)
      end
    end
  end

  describe "GET v1/sites/:site_id/tutorials/:id" do

    before { get v1_site_tutorial_path(site_id, id) }

    context "when the record exists" do

      it "returns the tutorial" do
        expect(json['data']).not_to be_empty
        expect(json['data']['id']).to eq(id.to_s)
      end

      it "returns associated tutorial items" do
        expect(json['data']['attributes']['tutorial_items']).not_to be_empty
        expect(json['data']['attributes']['tutorial_items'].size).to eq(5)
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
      before { post v1_site_tutorials_path(site_id), params: valid_attributes }

      it 'creates a tutorial' do
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
      before { post v1_site_tutorials_path(site_id), params: invalid_attributes }

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
      before { put v1_site_tutorial_path(site_id, id), params: valid_attributes }

      it 'updates the record' do
        expect(json['data']['attributes']['name']).to eq("Best Updated Tutorial")
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "DELETE v1/sites/:site_id/tutorials/:id" do
    before { delete v1_site_tutorial_path(site_id, id) }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
