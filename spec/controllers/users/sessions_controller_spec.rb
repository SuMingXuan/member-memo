require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  let(:phone) { '13608077730' }
  include Devise::Test::ControllerHelpers
  before do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end
  describe 'POST #create' do
    it 'signs in user and returns success' do
      user = create(:user, phone:)
      post :create, params: { phone: user.phone }
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #send_verify_code' do
    it 'returns success' do
      get :send_verify_code
      expect(response).to have_http_status(:success)
    end
  end

  describe '#check_verify_code!' do
    context 'when verify code matches' do
      it 'does not render error message' do
        allow(Rails.cache).to receive(:read).and_return('123456')
        post :create, params: { phone:, verify_code: '123456' }
        expect(JSON.parse(response.body)['success']).to be_truthy
      end
    end

    context 'when verify code does not match' do
      it 'renders error message' do
        allow(Rails.cache).to receive(:read).and_return('123456')
        post :create, params: { phone:, verify_code: '654321' }
        expect(JSON.parse(response.body)['success']).to be_falsey
      end
    end
  end

  describe '#check_send_frequent!' do
    context 'when sending is not frequent' do
      it 'does not render error message' do
        allow(Rails.cache).to receive(:read).and_return(nil)
        post :send_verify_code, params: { phone: }
        expect(JSON.parse(response.body)['success']).to be_truthy
      end
    end

    context 'when sending is frequent' do
      it 'renders error message' do
        allow(Rails.cache).to receive(:read).and_return(true)
        post :send_verify_code, params: { phone: }
        expect(JSON.parse(response.body)['success']).to be_falsey
      end
    end
  end
end
