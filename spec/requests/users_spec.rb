require 'rails_helper'

RSpec.describe "Users", type: :request do

  let!(:user) { create(:user) }
  let!(:id) { user.id }
  let!(:user_list) { create_list(:user, 10) }

  describe "GET /v1/users" do

    # make HTTP get request before each example
    before { get v1_users_path, headers: authenticated_header(user) }

    it "it returns status code 200" do
      expect(response).to have_http_status(200)
    end

    it "returns users" do
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(11)
    end
  end

  describe "GET /v1/users/:id" do

    before { get v1_user_path(id), headers: authenticated_header(user) }

    context "when the user exists" do
      it "returns the user" do
        expect(json['data']).not_to be_empty
        expect(json['data']['id']).to eq(id.to_s)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the user does not exist' do
      let(:id) { 999 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  describe "POST /v1/users" do

    let(:valid_attributes) { { "user"=>{"email"=>"safetyman@gmail.com", "password"=>"secure123", "password_confirmation"=>"secure123"} } }
    let(:invalid_attributes) { { "user"=>{"email"=>"nopassword@gmail.com", "password"=>""} } }

    context 'when the request is valid' do
      before { post v1_users_path, params: valid_attributes }

      it 'creates a user' do
        expect(json['data']['attributes']['email']).to eq("safetyman@gmail.com")
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post v1_users_path, params: invalid_attributes }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/can't be blank/)
      end
    end
  end

  describe 'PUT /v1/users/:id' do
    let(:valid_attributes) { { "user"=>{"email"=>"updatedemail@gmail.com"} } }

    context 'when the record exists' do
      before { put v1_user_path(id), params: valid_attributes, headers: authenticated_header(user) }

      it 'updates the record' do
        expect(json['data']['attributes']['email']).to eq("updatedemail@gmail.com")
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /user/:id' do
    before { delete v1_user_path(id), headers: authenticated_header(user) }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
