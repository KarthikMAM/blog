# frozen_string_literal: true

if @blog_posts.nil?
  json.success false
  json.error [['Blog Posts', "Tag #{params[:name]} not found"]]
else
  json.success true
  json.payloadType 'blog'
  json.payload convert_blog_posts_to_json(@blog_posts.map(&:blog_post))
  json.payloadPages @blog_posts.total_pages
end
