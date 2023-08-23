FactoryBot.define do
  factory :user do
    name { FFaker::NameCN.name }
    phone { "136#{rand(0..99_999_999).to_s.rjust(8, '0')}" }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
    birthday { FFaker::Time.date(year_range: 30) }
  end
end
