FactoryGirl.define do
  factory :site do
    url { Faker::Internet.url('example.com', '') }
    site_code { Faker::Code.ean }
    user_id nil
  end
end