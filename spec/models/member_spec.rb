require 'rails_helper'

RSpec.describe Member, type: :model do
  describe 'scopes' do
    describe '.sorted_by_expiry' do
      let!(:expired_member) { create(:member, expires_at: 1.day.ago) }
      let!(:future_member) { create(:member, expires_at: 1.day.from_now) }
      let!(:unexpired_member) { create(:member, expires_at: nil) }

      it 'returns members in the correct order' do
        sorted_members = Member.sorted_by_expiry.to_a
        expect(sorted_members).to eq([future_member, unexpired_member, expired_member])
      end
    end
  end
end
