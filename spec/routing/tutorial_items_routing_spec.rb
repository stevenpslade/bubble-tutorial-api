require "rails_helper"

RSpec.describe TutorialItemsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/tutorial_items").to route_to("tutorial_items#index")
    end

    it "routes to #new" do
      expect(:get => "/tutorial_items/new").to route_to("tutorial_items#new")
    end

    it "routes to #show" do
      expect(:get => "/tutorial_items/1").to route_to("tutorial_items#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/tutorial_items/1/edit").to route_to("tutorial_items#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/tutorial_items").to route_to("tutorial_items#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/tutorial_items/1").to route_to("tutorial_items#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/tutorial_items/1").to route_to("tutorial_items#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/tutorial_items/1").to route_to("tutorial_items#destroy", :id => "1")
    end

  end
end
