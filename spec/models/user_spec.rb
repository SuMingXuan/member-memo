require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#user_info_json' do
    let(:user) { create(:user, phone: '1234567890', name: 'John Doe', birthday: Date.new(1990, 1, 1)) }

    it 'returns a hash with user info' do
      user_info = user.user_info_json
      expect(user_info).to be_a(Hash)
      expect(user_info).to include('phone' => '1234567890', 'name' => 'John Doe', 'birthday' => '1990-01-01')
    end

    it 'includes only specified attributes' do
      user_info = user.user_info_json
      expect(user_info.keys).to match_array(%w[phone name birthday])
    end
  end
end
