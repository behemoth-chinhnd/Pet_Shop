Rails.application.routes.draw do
  namespace :api do
    resource :auths, only: [] do
      collection do
        post :admin_login
        post :user_login
      end
    end

    resource :user

    get :users, to: "users#index"

    resources :products
  end
end
