require 'rails_helper'

RSpec.describe "Tutorials", type: :request do
  describe "GET /tutorials" do
    it "works! (now write some real specs)" do
      get tutorials_path
      expect(response).to have_http_status(200)
    end
  end
end
