if @projects.nil?
  json.success false
  json.error [['Projects', "Tag #{params[:name]} not found"]]
else
  json.success true
  json.payloadType 'projects'
  json.payload convert_projects_to_json(@projects.map { |e| e.project })
  json.payloadPages @projects.total_pages
end
