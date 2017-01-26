class BlogPostsController < ApplicationController
  def index
    @blog_posts = BlogPost
                      .includes(blog_post_tags: [:tag])
                      .paginate(page: params[:page], per_page: 10)
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)

    print(params)

    if @blog_post.save
      params[:tags].to_s.split(',').each do |tag|
        Tag.create(name: tag.strip)
        BlogPostTag.create(
            blog_post_id: @blog_post.id,
            tag_id: Tag.find_by(name: tag.strip).id)
      end

      flash[:success] = 'Blog Post added successfully'
      redirect_to @blog_post
    else
      flash[:error] = @blog_post.errors.messages
      redirect_to new_blog_post_path
    end

  end

  def new
    @blog_post = BlogPost.new
    @tags = ''
    @form_target = '/admin/blog/posts'
  end

  def edit
    @blog_post = BlogPost.includes(blog_post_tags: [:tag]).find_by(id: params[:id])
    @tags = []

    if @blog_post.nil?
      flash[:error] = [['Blog Post', "Record #{params[:id]} not found"]]
      redirect_to blog_post_path
    else
      @form_target = "/admin/blog/posts/#{@blog_post.id}"

      if @blog_post.blog_post_tags.any?
        @blog_post.blog_post_tags.each do |tag|
          @tags << tag.tag.name
        end
      end

      @tags = @tags.join(', ')
    end
  end

  def show
    @blog_post = BlogPost
                     .includes(blog_post_tags: [:tag])
                     .find_by(id: params[:id])

    if @blog_post.nil?
      flash[:error] = [['Blog Post', "Record #{params[:id]} not found"]]
      redirect_to '/blog/posts'
    end
  end

  def update
    @blog_post = BlogPost.includes(blog_post_tags: [:tag]).find_by(id: params[:id])

    if @blog_post.update_attributes(blog_post_params)
      new_tags = params[:tags]
                     .to_s.downcase
                     .split(',')
                     .map { |e| e.strip }
                     .to_set

      old_tags = Set.new
      @blog_post.blog_post_tags.each do |tag|
        old_tags << tag.tag.name
      end

      (new_tags - old_tags).each do |add_tag|
        Tag.create(name: add_tag.strip)
        BlogPostTag.create(
            tag_id: Tag.find_by(name: add_tag.strip).id,
            blog_post_id: @blog_post.id)
      end

      (old_tags - new_tags).each do |delete_tag|
        BlogPostTag
            .find_by_blog_post_id_and_tag_id(@blog_post.id, Tag.find_by(name: delete_tag).id)
            .destroy
      end

      flash[:success] = 'Update successful'
      redirect_to @blog_post
    else
      flash[:error] = @blog_post.errors.messages
      redirect_back
    end
  end

  def tags
    @tag = params[:name]
    @blog_posts = Tag.includes(blog_post_tags: [:blog_post])
                      .find_by(name: params[:name])
                      .blog_post_tags
                      .paginate(page: params[:page], per_page: 10)
  end

  private

  def blog_post_params
    params.require(:blog_post).permit(:title, :desc, :content)
  end
end
