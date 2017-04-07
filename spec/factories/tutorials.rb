FactoryGirl.define do
  factory :tutorial do
    name { Faker::Internet.domain_word }
    active true
    user_id nil
    site_id nil
  end  
end