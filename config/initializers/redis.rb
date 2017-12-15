# frozen_string_literal: true

url = ENV['REDIS_URL'] || "redis://127.0.0.1:6379/#{Rails.env.development? ? '0' : '1'}"
$redis = Redis::Namespace.new('blog', redis: Redis.new(url: url))
