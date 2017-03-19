class ProjectsController < ApplicationController
  before_action :requireLogIn, only: [:edit, :update, :create, :new]

  def index
    @projects = Project
                    .includes(project_tags: [:tag])
                    .paginate(page: params[:page], per_page: 10)
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      params[:tags].to_s.downcase.split(',').each do |tag|
        Tag.create(name: tag)
        ProjectTag.create(
            project_id: @project.id,
            tag_id: Tag.find_by(name: tag.strip).id)
      end

      respond_to do |format|
        format.json
        format.html {
          flash[:success] = 'Project added successfully'
          redirect_to @project
        }
      end
    else
      respond_to do |format|
        format.html {
          flash[:error] = @project.errors.messages
          redirect_back fallback_location: projects_path
        }
        format.json
      end
    end

  end

  def new
    @project = Project.new
    @tags = ''
  end

  def edit
    @project = Project
                   .includes(project_tags: [:tag])
                   .find_by(id: Slug[controller_name, params[:id]])
    @tags = []

    if @project.nil?
      respond_to do |format|
        format.html {
          flash[:error] = [['Project', "Record #{params[:id]} not found"]]
          redirect_to projects_path
        }
        format.json
      end
    else
      @tags = @project.project_tags.map { |e| e.tag.name }.join(', ')
    end
  end

  def show
    @project = Project
                   .includes(project_tags: [:tag])
                   .find_by(id: Slug[controller_name, params[:id]])

    if @project.nil?
      respond_to do |format|
        format.html {
          flash[:error] = [['Project', "Record #{params[:id]} not found"]]
          redirect_to projects_path
        }
        format.json
      end
    end
  end

  def update
    @project = Project
                   .includes(project_tags: [:tag])
                   .find_by(id: Slug[controller_name, params[:id]])

    if @project.update_attributes(project_params)

      new_tags = params[:tags]
                     .to_s.downcase
                     .split(',')
                     .map { |e| e.strip }
                     .to_set

      old_tags = Set.new
      @project.project_tags.each do |tag|
        old_tags << tag.tag.name
      end

      (new_tags - old_tags).each do |add_tag|
        Tag.create(name: add_tag.strip)
        ProjectTag.create(
            tag_id: Tag.find_by(name: add_tag.strip).id,
            project_id: @project.id)
      end

      (old_tags - new_tags).each do |delete_tag|
        ProjectTag
            .find_by_project_id_and_tag_id(@project.id, Tag.find_by(name: delete_tag).id)
            .destroy
      end

      respond_to do |format|
        format.json
        format.html {
          flash[:success] = 'Update successful'
          redirect_to @project
        }
      end
    else
      respond_to do |format|
        format.json
        format.html {
          flash[:success] = @project.errors.messages
          redirect_to projects_path
        }
      end
    end
  end

  def tags
    @tag = CGI::unescape(params[:name])
    @projects = ProjectTag
                    .includes(project: {project_tags: [:tag]})
                    .where(tag_id: Tag.find_by(name: @tag).id)
                    .paginate(page: params[:page], per_page: 10)
  rescue
    @projects = nil
    respond_to do |format|
      format.json
      format.html {
        flash[:error] = [['Tags', "#{@tag} not found"]]
        redirect_to projects_path
      }
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :github, :store, :desc, :content)
  end
end
