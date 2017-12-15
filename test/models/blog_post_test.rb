# frozen_string_literal: true

require 'test_helper'

class BlogPostTest < ActiveSupport::TestCase
  def setup
    @blog_post = BlogPost.new
    @title = @blog_post.title = 'Test'
    @content = @blog_post.content = 'Test Content'
    @desc = @blog_post.desc = 'Test description'
  end

  test 'default blog must be valid' do
    assert @blog_post.valid?
  end

  test 'blog title must be present' do
    [' ', '', '  '].each do |title|
      @blog_post.title = title
      assert_not @blog_post.valid?
    end

    @blog_post.title = @title
  end

  test 'blog content must be present' do
    [' ', '', '  '].each do |content|
      @blog_post.content = content
      assert_not @blog_post.valid?
    end

    @blog_post.content = @content
  end

  test 'blog description must be present' do
    [' ', '', '  '].each do |desc|
      @blog_post.desc = desc
      assert_not @blog_post.valid?
    end

    @blog_post.desc = @desc
  end

  test 'blog post should not be too long' do
    ['a' * 257, 'a' * 256, 'a' * 30].each do |desc|
      @blog_post.desc = desc
      if desc.size > 256
        assert_not @blog_post.valid?
      elsif assert @blog_post.valid?
      end
    end
  end
end
