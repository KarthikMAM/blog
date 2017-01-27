module ApplicationHelper
  include AdminHelper

  def full_title(title= '')
    return title + " | Karthik's Blog"
  end
end
