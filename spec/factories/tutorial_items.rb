FactoryGirl.define do
  factory :tutorial_item do
    title { Faker::Internet.domain_word }
    content { Faker::Lorem.sentence }
    sequence(:order)
    css_selector "#my-div-or-whatever"
    active true
    tutorial_id nil
  end  
end