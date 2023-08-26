FactoryBot.define do
  factory :member do
    card_number { "136#{rand(0..99_999_999).to_s.rjust(8, '0')}" }
    level { '白银' }
    birthday { FFaker::Time.date(year_range: 30) }
    created_card_at { '2023-08-24 23:14:40' }
    expires_at { Time.now + rand(0..365).days }
    store_name { FFaker::CompanyCN.name }
    store_address { FFaker::Address.street_address }
    store_image_url { FFaker::Internet.http_url }
    points { rand(0..10_000) }
    balance { rand(0..10_000.0).round(2) }
    coupons_count { 3 }
    activity_rules { FFaker::LoremCN.paragraph }
    theme { %i[primary dark].sample }
    user
  end
end
