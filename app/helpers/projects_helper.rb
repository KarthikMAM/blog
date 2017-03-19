module ProjectsHelper
  def convert_projects_to_json(projects)
    return projects.map { |project| {
        id: project.id,
        name: project.name,
        slug: project.to_param,
        github: project.github,
        store: project.store,
        desc: project.desc,
        content: project.content,
        createdAt: project.created_at,
        tags: project.project_tags.map { |e| CGI.escape(e.tag.name) },
        links: {
            path: project_item_path(project),
            edit: logged_in? ? edit_project_path(project) : nil
        }
    }}
  end
end
