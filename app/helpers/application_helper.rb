# frozen_string_literal: true

module ApplicationHelper
  include AdminHelper

  def full_title(title = '')
    "#{title} | Karthik M A M"
  end

  def new_path
    case controller_name
    when 'projects'
      new_project_path
    when 'blog_posts'
      new_blog_post_path
    end
  end

  def edit_path(item)
    case controller_name
    when 'projects'
      edit_project_path(item)
    when 'blog_posts'
      edit_blog_post_path(item)
    end
  end

  def title
    if controller_name != 'static_pages'
      controller_name.titleize
    else
      action_name.titleize
    end
  end
end
