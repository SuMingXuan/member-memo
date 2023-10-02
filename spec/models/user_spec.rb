require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#as_json_list' do
    let(:user) { create(:user, phone: '1234567890', name: 'John Doe', birthday: Date.new(1990, 1, 1)) }

    it 'returns a hash with user info' do
      user_info = user.as_json_list
      expect(user_info).to be_a(Hash)
      expect(user_info).to include('phone' => '1234567890', 'name' => 'John Doe', 'birthday' => '1990-01-01')
    end

    it 'includes only specified attributes' do
      user_info = user.as_json_list
      expect(user_info.keys).to match_array(%w[phone name birthday max_members_count members_count seed])
    end
  end
end
