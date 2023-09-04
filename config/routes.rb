require 'sidekiq/web'

Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_scope :user do
    post '/users/sign_in/send_verify_code', to: 'users/sessions#send_verify_code'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'members#index'
  resources :members, param: :uuid do
    member do
      post :recharge, :consumption
    end
  end
  get :profile, to: 'profile#show'
end
