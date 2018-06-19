Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :delete]
      resources :users, only: [:index, :show]
      # post 'login', to: 'events#current_user'
    end
  end
end
