FactoryBot.define do
  factory :order do
    product { nil }
    user { nil }
    payment_amount { "9.99" }
  end
end
