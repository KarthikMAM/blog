Rails.application.routes.draw do
  get 'home', to: 'static_pages#home'
  get 'projects', to: 'projects#index'
  get 'blog/posts', to: 'blog_posts#index', as: 'blog'
  get 'about', to: 'static_pages#about'
  get 'contact', to: 'static_pages#contact'

  root 'static_pages#home'

  get 'projects/tags/:name', to: 'projects#tags'
  resources :projects, only: [:show, :index]
  scope 'admin' do
    resources :projects, only: [:update, :edit, :new, :create]
  end

  get 'blog/posts/tags/:name', to: 'blog_posts#tags'
  resources :blog_posts, only: [:show, :index], path: '/blog/posts'
  scope 'admin' do
    resources :blog_posts, only: [:update, :edit, :new, :create], path: '/blog/posts'
  end

  get 'login', to: 'admin#new', as: 'login'
  post 'login', to: 'admin#create'
  get 'admin', to: 'admin#show', as: 'admin'
  get 'logout', to: 'admin#destroy', as: 'logout'

  get 'search', to: 'search#query', as: 'search_path'

  #paths for api calls from front-end
  scope 'api' do
    get 'about', to: 'static_pages#about'

    get 'projects/tags/:name/(:page)', to: 'projects#tags', as: :project_tags
    get 'projects/items/:id', to: 'projects#show', as: :project_item
    get 'projects/index/(:page)', to: 'projects#index'
    scope 'admin' do 
      resources :projects, only: [:update, :edit, :new, :create], as: :project_item
    end

    get 'blog/tags/:name/(:page)', to: 'blog_posts#tags', as: :blog_post_tags
    get 'blog/items/:id', to: 'blog_posts#show', as: :blog_item
    get 'blog/index/(:page)', to: 'blog_posts#index'
    scope 'admin' do 
      resources :blog_posts, only: [:update, :edit, :new, :create], as: :blog_post_item
    end

    get 'search', to: 'search#query'
  end
end
