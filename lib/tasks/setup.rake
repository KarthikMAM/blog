# frozen_string_literal: true

require 'digest'

namespace :setup do
  task slugs: :environment do
    Project.all.each do |project|
      Slug['projects', project.to_param] = project.id
    end

    BlogPost.all.each do |blog_post|
      Slug['blog_posts', blog_post.to_param] = blog_post.id
    end
  end

  task search: :environment do
    Tag.all.each do |tag|
      $redis.sadd("search-tags-#{tag.name[0]}", CGI.escape(tag.name))
    end

    $redis.hgetall('projects').each do |project_slug, _|
      $redis.sadd("search-projects-#{project_slug[0]}", project_slug)
    end

    $redis.hgetall('blog_posts').each do |blog_post_slug, _|
      $redis.sadd("search-blog_posts-#{blog_post_slug[0]}", blog_post_slug)
    end
  end

  task admin: :environment do
    $redis.set('user', ENV['user'])
    $redis.set('password', Digest::SHA1.hexdigest(ENV['password']))
    $redis.del('token')
  end
end
