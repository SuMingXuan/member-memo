class Member < ApplicationRecord
  belongs_to :user

  enum theme: { primary: 0, dark: 1 }

  scope :sorted_by_expiry, lambda {
    order(Arel.sql("
      CASE WHEN expires_at IS NULL THEN 1 WHEN expires_at > '#{Time.now}' THEN 0 ELSE 2 END,
      expires_at ASC"))
  }
end
