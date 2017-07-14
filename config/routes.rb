Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/" => redirect("https://www.linkedin.com/in/stevenslade/")

  constraints subdomain: 'api' do
    scope module: 'api' do
      namespace :v1 do
        resources :sites do
          resources :tutorials do
          end
        end
        resources :users
        resources :tutorial_items
      end
    end
  end
end
