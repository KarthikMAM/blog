# frozen_string_literal: true

if !@projects.empty?
  json.payloadType 'projects'
  json.payload convert_projects_to_json(@projects)
  json.success true
  json.payloadPages @projects.total_pages
else
  json.success false
  json.error [['Projects', 'End of the projects']]
end
