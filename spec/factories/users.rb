FactoryGirl.define do
  factory :user do
    email { Faker::Internet.free_email }
    password { Faker::Internet.password }
  end
end