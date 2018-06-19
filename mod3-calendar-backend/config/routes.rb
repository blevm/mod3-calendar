Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :destroy]
      resources :users, only: [:index, :show]
      resources :tags, only: [:index, :create]
    end
  end
end
