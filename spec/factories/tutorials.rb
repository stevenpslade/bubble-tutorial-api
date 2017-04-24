FactoryGirl.define do
  factory :tutorial do
    name { Faker::Internet.domain_word }
    page_url { Faker::Internet.url }
    active true
    skippable false
    show_steps true
    user_id nil
    site_id nil
  end  
end