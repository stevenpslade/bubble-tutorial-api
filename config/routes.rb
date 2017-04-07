Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  constraints subdomain: 'api' do
    scope module: 'api' do
      namespace :v1 do
        resources :sites do
          resources :tutorials do
            # TODO: consider NOT doing this. Rails docs say no more than 1 layer deep with
            # nesting and since I'm side loading this in tutorials anyways, this route
            # for the api won't really be used like this anyways.
            resources :tutorial_items
          end
        end
        resources :users
      end
    end
  end
end
