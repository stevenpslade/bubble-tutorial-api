FactoryGirl.define do
  factory :tutorial do
    name { Faker::Coffee.blend_name }
    active true
    user_id nil
    site_id nil
  end  
end