require 'rails_helper'

RSpec.describe Site, type: :model do
  # Association test
  # ensure Site belongs_to User
  it { should belong_to(:user) }
  # ensure Site has 1:m relationship with the Tutorial model
  it { should have_many(:tutorials) }
  # Validation tests
  # ensure columns url, site_code are present before saving
  it { should validate_presence_of(:url) }
  it { should validate_presence_of(:site_code) }
  it { should validate_uniqueness_of(:site_code) }
end
