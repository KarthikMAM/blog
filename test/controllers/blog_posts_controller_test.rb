require 'test_helper'
require 'digest'

class BlogPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @default_title = "Karthik M A M"

    @blog_post = BlogPost.create(
        title: 'hello',
        content: 'world',
        desc: 'world'
    )
    @fake_post = BlogPost.new
    Slug['blog_posts', @blog_post.to_param] = @blog_post.id

    login
  end

  def teardown
    logout
    $redis.del('blog_posts')
    $redis.del("blog_posts-#{@blog_post.id}")
  end

  test 'should get blog posts' do
    get blog_posts_path
    assert_select 'head title', {count: 1, text: "Blog Posts | #{@default_title}"}
    assert_select 'div.alert', {count: 0}
  end

  test 'should get blog post' do
    get blog_post_path(@blog_post)
    assert_response :success
    assert_template 'shared/_content'
    assert_select 'div.alert', {count: 0}
  end

  test 'should get new blog post page' do
    get new_blog_post_path
    assert_response :success
    assert_template 'shared/_form'
    assert_select 'div.alert', {count: 0}
  end

  test 'should get edit blog post page' do
    get edit_blog_post_path(@blog_post)
    assert_response :success
    assert_template 'shared/_form'
    assert_select 'div.alert', {count: 0}
  end

  test 'should create a new blog post' do
    assert_difference %w(BlogPost.count BlogPostTag.count) do
      post blog_posts_path, params: {
          blog_post: {
              title: 'Test',
              desc: 'TestDesc',
              content: 'Test Content'
          },
          tags: 'Tag1'
      }
    end

    assert_redirected_to blog_post_path(BlogPost.find_by(title: 'Test'))
  end

  test 'should not create a new blog post' do

    blog_post_count = Project.count
    blog_post_tag_count = ProjectTag.count

    post blog_posts_path, params: {
        blog_post: {
            title: '',
            desc: '',
            content: ''
        },
        tags: 'Tag1'
    }

    assert_equal blog_post_count, BlogPostTag.count
    assert_equal blog_post_tag_count, BlogPostTag.count
  end

  test 'should update a blog post' do

    patch blog_post_path(@blog_post), params: {
        blog_post: {
            title: 'hello',
            content: 'hello',
            desc: 'hello'
        },
        tags: 'Tag1'
    }

    @blog_post.reload

    assert_equal @blog_post.title, 'hello'
    assert_equal @blog_post.content, 'hello'
    assert_equal @blog_post.desc, 'hello'
    assert_equal @blog_post.blog_post_tags.count, 1
    assert_redirected_to blog_post_path(@blog_post)
  end

  test 'should not update a blog post' do
      patch blog_post_path(@blog_post), params: {
          blog_post: {
              title: ' ',
              content: '',
              desc: ' '
          },
          tags: 'Tag1,Tag2'
      }
      assert_redirected_to blog_posts_path

    @blog_post.reload

    assert_not_equal @blog_post.title, ' '
    assert_not_equal @blog_post.content, ''
    assert_not_equal @blog_post.desc, ' '
    assert_not_equal @blog_post.blog_post_tags.count, 2
  end
end
