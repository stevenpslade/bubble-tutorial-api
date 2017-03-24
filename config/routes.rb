Rails.application.routes.draw do
  resources :tutorial_items
  resources :tutorials
  resources :sites
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
