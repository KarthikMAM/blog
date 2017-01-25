require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  def setup
    @name = @github = 'Project'
    @store = 'http://github.com/KarthikMAM/Project/release'
    @desc = 'Project template'
    @content = 'Project content'

    @project = Project.new(name: @name, github: @github, store: @store, desc: @desc, content: @content)
  end

  test 'should be valid' do
    assert @project.valid?
  end

  test 'name should be present' do
    [' ', '    ', ''].each do |name|
      @project.name = name
      assert_not @project.valid?
    end

    @project.name = @name
  end

  test 'github should be present' do
    [' ', '  ', ''].each do |github|
      @project.github = github
      assert_not @project.valid?
    end

    @project.github = @github
  end

  test 'github should be invalid' do
    %w[$dfh hf$jj welcome\ hello wec\nworl].each do |github|
      @project.github = github
      assert_not @project.valid? "#{github} should be invalid"
    end
  end

  test 'github should be valid' do
    %w[HelloWorld Hello hello
        hello-world Hello-World-Welcome A ].each do |github|
      @project.github = github
      assert @project.valid?, "#{github} should be valid"
    end
  end

  test 'store should be invalid' do
    %w[http://github hello@ ^ github$.com].each do |store|
      @project.store = store
      assert_not @project.valid?, "#{store} should be invalid"
    end
  end

  test 'store should be valid' do
    %w[http://github.com github.com github.com/karthik/hello github.com/hello https://github.com/hello].each do |store|
      @project.store = store
      assert @project.valid?, "#{store} should be valid"
    end
  end

  test 'name must be unique' do
    @project_dup = @project.dup
    @project.save
    assert_not @project_dup.valid?
  end

  test 'github must be unique' do
    @project_dup = @project.dup
    @project_dup.github = @project_dup.github.upcase
    @project.save
    assert_not @project_dup.valid?
  end

  test 'store not needed' do
    [' ', '   ', ''].each do |store|
      @project.store = store
      assert @project.valid?
    end
  end

  test 'description should not be too long' do
    @project.desc = 'a' * 257
    assert_not @project.valid?

    @project.desc = 'a' * 256
    assert @project.valid?
  end

  test 'content should be present' do
    [' ', '', '  '].each do |content|
      @project.content = content
      assert_not @project.valid?
    end
  end
end