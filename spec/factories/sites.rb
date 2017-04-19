FactoryGirl.define do
  factory :site do
    url { Faker::Internet.domain_name }
    site_code { Faker::Code.ean }
    user_id nil
  end
end