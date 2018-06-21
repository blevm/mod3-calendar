Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :create, :destroy, :update]
      resources :users, only: [:index, :show] do 
        resources :events, only: [:index], controller: 'users/events'
      end
      resources :flatiron_events, only: [:index]
      resources :tags, only: [:index, :create]
      post 'login', to: 'users#login'
    end
  end
end
