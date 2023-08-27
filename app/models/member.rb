class Member < ApplicationRecord
  include UuidConcern

  FREE_THEMES = { dark: 0, primary: 1 }.freeze
  PAID_THEMES = {}.freeze
  THEMES = FREE_THEMES.merge(PAID_THEMES)

  enum theme: FREE_THEMES

  belongs_to :user, counter_cache: true

  scope :sorted_by_expiry, lambda {
    order(Arel.sql("
      CASE WHEN expires_at IS NULL THEN 1 WHEN expires_at > '#{Time.now}' THEN 0 ELSE 2 END,
      expires_at ASC"))
  }

  def to_param
    uuid
  end
end
