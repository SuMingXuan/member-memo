module InvitationConcern
  extend ActiveSupport::Concern

  included do
    validates :code, presence: true, uniqueness: true

    before_validation :set_invitation_code, on: :create
    after_create :process_invitation_code

    has_many :invited_users, class_name: 'User', foreign_key: 'invitation_code', primary_key: 'code'
    belongs_to :inviter, class_name: 'User', foreign_key: 'invitation_code', primary_key: 'code', optional: true

    delegate :count, to: :invited_users, prefix: true

    private

    def set_invitation_code
      loop do
        self.code = SecureRandom.hex(4)
        break unless User.exists?(code:)
      end
    end

    def process_invitation_code
      return unless inviter

      inviter.increment!(:max_members_count)
    end
  end
end
