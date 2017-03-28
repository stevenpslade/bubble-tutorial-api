require 'rails_helper'

RSpec.describe User, type: :model do
  # Association test
  # ensure User has many Sites
  # ensure User has many Tutorials
  it { should have_many(:sites).dependent(:destroy) }
  it { should have_many(:tutorials).dependent(:destroy) }
  # Validation test
  # ensure user has an email
  it { should validate_presence_of(:email) }
end
