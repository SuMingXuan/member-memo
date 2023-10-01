namespace = "member_memo:weixin_authorize"
redis = Redis::Namespace.new(namespace,
                             redis: Redis.new(url: ENV['REDIS_URL']))

# TODO: 放到sidekiq定时任务处理
# 每次重启时，会把当前的命令空间所有的access_token 清除掉。
# exist_keys = redis.keys("#{namespace}:*")
# exist_keys.each { |key| redis.del(key) }

# Give a special namespace as prefix for Redis key, when your have more than one project used weixin_authorize, this config will make them work fine.
WeixinAuthorize.configure do |config|
  config.redis = redis
end

$wechat_client = WeixinAuthorize::Client.new(ENV['WECHAT_APP_ID'], ENV['WECHAT_APP_SECRET'], redis_keys: "#{namespace}:*")
