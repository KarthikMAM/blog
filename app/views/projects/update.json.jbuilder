if not @project.id.nil?
  json.payloadType 'projects'
  json.payload convert_projects_to_json([@project])
  json.success true
else
  json.success false
  json.error [['Projects', 'Project not updated']]
end