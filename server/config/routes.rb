Rails.application.routes.draw do
  namespace :api do
    resource :auths, only: [] do
      collection do
        post :admin_login
        post :user_login
      end
    end

    resources :users
  end
end
