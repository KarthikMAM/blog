# frozen_string_literal: true

module BlogPostsHelper
  def convert_blog_posts_to_json(blog_posts)
    blog_posts.map do |blog_post|
      {
        id:        blog_post.id,
        name:      blog_post.name,
        slug:      blog_post.to_param,
        desc:      blog_post.desc,
        content:   blog_post.content,
        tags:      blog_post.blog_post_tags.map { |e| CGI.escape(e.tag.name) },
        createdAt: blog_post.created_at,
        links:     {
          path: blog_item_path(blog_post),
          edit: logged_in? ? edit_blog_post_path(blog_post) : nil
        }
      }
    end
  end
end
