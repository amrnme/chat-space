Rails.application.routes.draw do
  resources :articles
  get 'messages/index'

  root "messages#index"
end
