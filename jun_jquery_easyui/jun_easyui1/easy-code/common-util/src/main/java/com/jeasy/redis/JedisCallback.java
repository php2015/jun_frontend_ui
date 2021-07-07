package com.jeasy.redis;

import redis.clients.jedis.Jedis;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public interface JedisCallback<T> {

    public T doInRedis(Jedis jedis);

}
