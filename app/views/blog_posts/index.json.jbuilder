if @blog_posts.length > 0
  json.payloadType 'blog'
  json.payload convert_blog_posts_to_json(@blog_posts)
  json.success true
  json.payloadPages @blog_posts.total_pages
else
  json.success false
  json.error [['Blog Posts', 'End of the blog posts']]
end
