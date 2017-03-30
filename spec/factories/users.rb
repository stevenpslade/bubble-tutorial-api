FactoryGirl.define do
  factory :user do
    email { Faker::Internet.free_email }
  end
end