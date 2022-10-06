Rails.application.routes.draw do
  namespace :api do
    resource :auths, only: [] do
      collection do
        post :admin_login
        post :user_login
      end
    end

    ## User
    resource :user

    get :users, to: "users#index"

    ## Product
    resources :products

    ## Order
    resource :order do
      collection do
        post :submit
      end
    end

    get :orders, to: "orders#index"

    ## Address
    resources :addresses

    ## Cart
    resource :cart, only: [] do
      collection do
        post :add_product
        post :remove_product
        get :show
      end
    end
  end
end
