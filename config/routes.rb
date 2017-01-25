Rails.application.routes.draw do
  get '/home',        to: 'static_pages#home'
  get '/projects',    to: 'projects#index'
  get '/blog/posts',  to: 'blog_posts#index', as: 'blog'
  get '/about',       to: 'static_pages#about'
  get '/contact',     to: 'static_pages#contact'

  root 'static_pages#home'

  get 'projects/tags', to: 'projects#tags'
  resources :projects, only: [:show, :index]
  scope '/admin' do
    resources :projects, only: [:update, :edit, :new, :create]
  end

  get 'blog_posts/tags', to: 'blog_posts#tags'
  resources :blog_posts, only: [:show, :index], path: '/blog/posts'
  scope 'admin' do
    resources :blog_posts, only: [:update, :edit, :new, :create], path: '/blog/posts'
  end
end
