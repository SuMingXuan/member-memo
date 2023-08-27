require 'rails_helper'

RSpec.describe MembersController, type: :controller do
  describe 'GET #index' do
    let(:user) { create(:user) }
    let!(:expired_member) { create(:member, user:, expires_at: 1.day.ago) }
    let!(:future_member) { create(:member, user:, expires_at: 1.day.from_now) }
    let!(:unexpired_member) { create(:member, user:, expires_at: nil) }

    before do
      sign_in(user)
    end

    it 'assigns sorted members to @members' do
      get :index
      expect(assigns(:members)).to eq([future_member, unexpired_member, expired_member])
    end

    it 'renders the index template' do
      get :index
      expect(response).to render_template(:index)
    end
  end
end
