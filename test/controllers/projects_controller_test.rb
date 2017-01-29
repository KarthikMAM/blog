require 'test_helper'
require 'digest'

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @default_title = "Karthik M A M"

    @project = Project.create(
        name: 'hello',
        content: 'world',
        desc: 'world',
        github: 'world',
        store: 'http://github.com'
    )
    @fake_project = Project.new
    Slug['projects', @project.to_param] = @project.id

    login
  end

  def teardown
    logout
    $redis.del('projects')
    $redis.del("projects-#{@project.id}")
  end

  test 'should get projects' do
    get projects_path
    assert_select 'head title', {count: 1, text: "Projects | #{@default_title}"}
    assert_select 'div.alert', {count: 0}
  end

  test 'should get project' do
    get project_path(@project)
    assert_response :success
    assert_template 'shared/_content'
    assert_select 'div.alert', {count: 0}
  end

  test 'should get new project page' do
    get new_project_path
    assert_response :success
    assert_template 'shared/_form'
    assert_select 'div.alert', {count: 0}
  end

  test 'should get edit project page' do
    get edit_project_path(@project)
    assert_response :success
    assert_template 'shared/_form'
    assert_select 'div.alert', {count: 0}
  end

  test 'should create a new project' do
    assert_difference %w(Project.count ProjectTag.count) do
      post "/admin#{projects_path}", params: {
          project: {
              name: 'Test',
              github: 'github',
              desc: 'TestDesc',
              content: 'Test Content'
          },
          tags: 'Tag1'
      }
    end

    assert_redirected_to project_path(Project.find_by(name: 'Test'))
  end

  test 'should not create a new project' do

    project_count = Project.count
    project_tag_count = ProjectTag.count

    post "/admin#{projects_path}", params: {
        project: {
            name: '',
            github: '',
            desc: '',
            content: ''
        },
        tags: 'Tag1'
    }

    assert_equal project_count, Project.count
    assert_equal project_tag_count, ProjectTag.count
  end

  test 'should not create a duplicate project' do

    project_count = Project.count
    project_tag_count = ProjectTag.count

    2.times.each do |i|
      post "/admin#{projects_path}", params: {
          project: {
              name: 'Test',
              github: 'github',
              desc: 'TestDesc',
              content: 'Test Content'
          },
          tags: 'Tag1'
      }
    end

    assert_equal project_count + 1, Project.count
    assert_equal project_tag_count + 1, ProjectTag.count
  end

  test 'should update a project' do

    patch "/admin#{project_path(@project)}", params: {
        project: {
            name: 'hello',
            github: 'hello',
            content: 'hello',
            desc: 'hello'
        },
        tags: 'Tag1'
    }

    @project.reload

    assert_equal @project.name, 'hello'
    assert_equal @project.content, 'hello'
    assert_equal @project.github, 'hello'
    assert_equal @project.desc, 'hello'
    assert_equal @project.project_tags.count, 1
    assert_redirected_to project_path(@project)
  end

  test 'should not update a project' do

    assert_raises ArgumentError do
      patch "/admin#{project_path(@project)}", params: {
          project: {
              name: '',
              github: '',
              content: '',
              desc: ''
          },
          tags: 'Tag1,Tag2'
      }
    end

    @project.reload

    assert_not_equal @project.name, ''
    assert_not_equal @project.content, ''
    assert_not_equal @project.github, ''
    assert_not_equal @project.desc, ''
    assert_not_equal @project.project_tags.count, 2
  end
end
