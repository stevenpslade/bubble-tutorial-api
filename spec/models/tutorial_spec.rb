require 'rails_helper'

RSpec.describe Tutorial, type: :model do
  # Association test
  it { should belong_to(:user) }
  it { should belong_to(:site) }
  it { should have_many(:tutorial_items) }
  # Validation test
  it { should validate_presence_of(:name) }
  it { should validate_exclusion_of(:active).in_array([nil]) }
  it { should validate_presence_of(:page_url) }
  it { should validate_exclusion_of(:skippable).in_array([nil]) }
  it { should validate_exclusion_of(:show_steps).in_array([nil]) }
end
