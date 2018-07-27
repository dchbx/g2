Rails.application.routes.draw do
  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout'
    },
    controllers: {
      sessions: 'sessions'
    },
    defaults: { format: :json }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :workflows, only: [:show, :index], format: :json
  end

  match "*path" => 'pages#index', via: :all
  root to: "pages#index"
end
