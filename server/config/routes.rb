Rails.application.routes.draw do
  namespace :api do
    resource :auths, only: [] do
      collection do
        post :admin_login
        post :user_login
      end
    end

    ## User
    resource :user do
      collection do
        get :list_product
        get :show_product
      end
    end

    get :users, to: "users#index"

    ## Product
    resources :products

    ## Order
    resource :order do
      collection do
        post :submit
        post :status_confirm
        post :status_transported
        post :status_delivered
        post :status_canceled
      end
    end

    get :orders, to: "orders#index"

    ## Order History
    resource :order_history, only: [:show]

    ## Address
    resources :addresses do
      collection do
        get :show_default
      end
    end

    ## Cart
    resource :cart, only: [] do
      collection do
        post :add_product
        post :remove_product
        get :show
      end
    end

    ## upload
    namespace :uploads do
      resources :upload, only: [:create]
    end

    ## Admin
    namespace :admins do
      # Categpry
      resources :categories
      # Species
      resources :species
      # Trademark
      resources :trademarks
    end
  end
end
