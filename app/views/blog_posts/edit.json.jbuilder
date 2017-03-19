if @blog_post.nil?
  json.success false
  json.error [['Blog Posts', "Blog post #{params[:id]} not found"]]
else
  json.authentication_token form_authenticity_token
  json.success true
end