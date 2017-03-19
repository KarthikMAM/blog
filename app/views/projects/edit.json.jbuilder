if @project.nil?
  json.success false
  json.error [['Projects', "Project #{params[:id]} not found"]]
else
  json.authentication_token form_authenticity_token
  json.success true
end