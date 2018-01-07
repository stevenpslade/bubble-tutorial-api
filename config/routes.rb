Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # get "/" => redirect("https://www.linkedin.com/in/stevenslade/")

  constraints subdomain: 'api' do
    scope module: 'api' do
      namespace :v1 do
        post 'user_token' => 'user_token#create'
        get 'get_current_user' => 'users#get_current_user'
        
        resources :sites do
          resources :tutorials do
          end
        end
        resources :users
        resources :tutorial_items
      end
    end
  end

  get '/', to: 'application#fallback_index_html', :constraints => ::Subdomains::Organization

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
