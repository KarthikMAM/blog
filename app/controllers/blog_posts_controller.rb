# frozen_string_literal: true

class BlogPostsController < ApplicationController
  before_action :requireLogIn, only: %i[edit update create new]

  def index
    @blog_posts = BlogPost.includes(blog_post_tags: [:tag])
                          .paginate(page: params[:page], per_page: 10)
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)

    if @blog_post.save
      params[:tags].to_s.downcase.split(',').each do |tag|
        Tag.create(name: tag)
        BlogPostTag.create(
          blog_post_id: @blog_post.id,
          tag_id:       Tag.find_by(name: tag.strip).id
        )
      end

      respond_to do |format|
        format.json
        format.html do
          flash[:success] = 'Blog Post added successfully'
          redirect_to @blog_post
        end
      end
    else
      respond_to do |format|
        format.html do
          flash[:error] = @blog_post.errors.messages
          redirect_back fallback_location: blog_posts_path
        end
        format.json
      end
    end
  end

  def new
    @blog_post = BlogPost.new
    @tags = ''
  end

  def edit
    @blog_post = BlogPost.includes(blog_post_tags: [:tag])
                         .find_by(id: Slug[controller_name, params[:id]])
    @tags = []

    if @blog_post.nil?
      respond_to do |format|
        format.html do
          flash[:error] = [['Blog Post', "Record #{params[:id]} not found"]]
          redirect_to blog_posts_path
        end
        format.json
      end
    else
      @tags = @blog_post.blog_post_tags.map { |e| e.tag.name }.join(', ')
    end
  end

  def show
    @blog_post = BlogPost.includes(blog_post_tags: [:tag])
                         .find_by(id: Slug[controller_name, params[:id]])

    if @blog_post.nil?
      respond_to do |format|
        format.html do
          flash[:error] = [['Blog Post', "Record #{params[:id]} not found"]]
          redirect_to blog_posts_path
        end
        format.json
      end
    end
  end

  def update
    @blog_post = BlogPost.includes(blog_post_tags: [:tag])
                         .find_by(id: Slug[controller_name, params[:id]])

    if @blog_post.update_attributes(blog_post_params)

      new_tags = params[:tags].to_s.downcase
                              .split(',')
                              .map(&:strip)
                              .to_set

      old_tags = Set.new
      @blog_post.blog_post_tags.each do |tag|
        old_tags << tag.tag.name
      end

      (new_tags - old_tags).each do |add_tag|
        Tag.create(name: add_tag.strip)
        BlogPostTag.create(
          tag_id:       Tag.find_by(name: add_tag.strip).id,
          blog_post_id: @blog_post.id
        )
      end

      (old_tags - new_tags).each do |delete_tag|
        BlogPostTag.find_by(blog_post_id: @blog_post.id, tag_id: Tag.find_by(name: delete_tag).id)
                   .destroy
      end

      respond_to do |format|
        format.json
        format.html do
          flash[:success] = 'Update successful'
          redirect_to @blog_post
        end
      end
    else
      respond_to do |format|
        format.json
        format.html do
          flash[:success] = @blog_post.errors.messages
          redirect_to blog_posts_path
        end
      end
    end
  end

  def tags
    @tag = CGI.unescape(params[:name])
    @blog_posts = BlogPostTag.includes(blog_post: { blog_post_tags: [:tag] })
                             .where(tag_id: Tag.find_by(name: @tag).id)
                             .paginate(page: params[:page], per_page: 10)
  rescue
    @blog_posts = nil
    respond_to do |format|
      format.json
      format.html do
        flash[:error] = [['Tags', "#{@tag} not found"]]
        redirect_to blog_posts_path
      end
    end
  end

  private

  def blog_post_params
    params.require(:blog_post).permit(:title, :desc, :content)
  end
end
