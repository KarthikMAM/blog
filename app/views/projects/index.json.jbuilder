if @projects.length > 0
  json.payloadType 'projects'
  json.payload convert_projects_to_json(@projects)
  json.success true
  json.payloadPages @projects.total_pages
else
  json.success false
  json.error [['Projects', 'End of the projects']]
end
