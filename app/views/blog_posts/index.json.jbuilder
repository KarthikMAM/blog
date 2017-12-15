# frozen_string_literal: true

if !@blog_posts.empty?
  json.payloadType 'blog'
  json.payload convert_blog_posts_to_json(@blog_posts)
  json.success true
  json.payloadPages @blog_posts.total_pages
else
  json.success false
  json.error [['Blog Posts', 'End of the blog posts']]
end
