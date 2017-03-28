require 'rails_helper'

RSpec.describe TutorialItem, type: :model do
  # Association test
  it { should belong_to(:tutorial) }
  # Validation tests
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:content) }
  it { should validate_exclusion_of(:active).in_array([nil]) }
end
