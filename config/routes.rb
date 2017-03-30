Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  constraints subdomain: 'api' do
    scope module: 'api' do
      namespace :v1 do
        resources :sites do
          resources :tutorials do
            resources :tutorial_items
          end
        end
        resources :users
      end
    end
  end
end
