require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_scope :user do
    post '/users/sign_in/send_verify_code', to: 'users/sessions#send_verify_code'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#index'
end
