Rails.application.routes.draw do
  namespace :api do
    resource :auths, only: [] do
      collection do
        post :admin_login
        post :user_login
      end
    end

    resources :users , except: [:show, :destroy, :update]

    get :user, to: 'users#show'
    delete :user, to: 'users#destroy'
    put :user, to: 'users#update'
  end
end
