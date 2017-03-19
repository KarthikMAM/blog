if not @blog_post.id.nil?
  json.payloadType 'blog'
  json.payload convert_blog_posts_to_json([@blog_post])
  json.success true
else
  json.success false
  json.error [['Blog Posts', 'Blog post not updated']]
end