# frozen_string_literal: true

class Slug
  class << self
    def [](type, slug)
      type = type.parameterize
      slug = slug.parameterize

      $redis.hget(type, slug)
    end

    def []=(type, slug, id)
      type = type.parameterize
      slug = slug.parameterize

      if $redis.hget(type, slug).nil?
        $redis.hset(type, slug, id)
        $redis.sadd("#{type}-#{id}", slug)
      elsif $redis.hget(type, slug) != id.to_s
        raise 'Slug already present'
      end
    end
  end
end
