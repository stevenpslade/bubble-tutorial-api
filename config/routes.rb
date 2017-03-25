Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  constraints subdomain: 'api' do
    scope module: 'api' do
      namespace :v1 do
        resources :tutorial_items
        resources :tutorials
        resources :sites
        resources :users
      end
    end
  end
end
