Rails.application.routes.draw do
  devise_scope :user do
    post '/users/sign_in/send_verify_code', to: 'users/sessions#send_verify_code'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'members#index'
  resources :pay, only: :create do
    collection do
      post :ali_auth, :wechat_auth
    end
  end
  resources :members, param: :uuid do
    member do
      post :recharge, :consumption
      post :toggle_display
    end
    collection do
      get :hidden
    end
  end
  get :profile, to: 'profile#show'
  put :profile, to: 'profile#update'
  resources :products, only: :index do
    collection do
      get :pay_success
    end
  end
  resources :orders, only: :create
end
