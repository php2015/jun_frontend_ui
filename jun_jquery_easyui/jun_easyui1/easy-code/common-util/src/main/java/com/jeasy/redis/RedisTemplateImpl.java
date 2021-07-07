package com.jeasy.redis;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import lombok.extern.slf4j.Slf4j;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisDataException;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public class RedisTemplateImpl implements RedisTemplate {

    private static final int TRUE_NUM = 1;
	private JedisPool jedisPool;
    private JedisSerializer jedisSerializer;

    public <T> boolean enqueue(final String key, final T value) {
        JedisCallback<Boolean> callback = new JedisCallback<Boolean>() {
            @Override
            public Boolean doInRedis(Jedis jedis) {
                String serializedValue = jedisSerializer.serialize(value);
                jedis.lpush(key, serializedValue);
                return Boolean.TRUE;
            }
        };
        return execute(callback);
    }

    public <T> T dequeue(final String key, final Class<T> clazz) {
        JedisCallback<T> callback = new JedisCallback<T>() {
            @Override
            public T doInRedis(Jedis jedis) {
                String json = jedis.rpop(key);
                if (json != null) {
                    return jedisSerializer.deSerialize(json, clazz);
                } else {
                    return null;
                }
            }
        };
        return execute(callback);
    }

    public long getLength(final String key) {
        JedisCallback<Long> callback = new JedisCallback<Long>() {
            @Override
            public Long doInRedis(Jedis jedis) {
                return jedis.llen(key);
            }
        };
        return execute(callback);
    }


    @Override
    public <T> T get(final String key, final Class<T> clazz) {
        JedisCallback<T> callback = new JedisCallback<T>() {
            @Override
            public T doInRedis(Jedis jedis) {
                String json = jedis.get(key);
                if (json != null) {
                    return jedisSerializer.deSerialize(json, clazz);
                } else {
                    return null;
                }
            }
        };
        return execute(callback);
    }

    @Override
    public <T> boolean set(final String key, final T value) {
        JedisCallback<Boolean> callback = new JedisCallback<Boolean>() {
            @Override
            public Boolean doInRedis(Jedis jedis) {
                String serializedValue = jedisSerializer.serialize(value);
                jedis.set(key, serializedValue);
                return Boolean.TRUE;
            }
        };
        return execute(callback);
    }

    @Override
    public <T> boolean setex(final String key, final int second, final T value) {
        JedisCallback<Boolean> callback = new JedisCallback<Boolean>() {
            @Override
            public Boolean doInRedis(Jedis jedis) {
                String serializedValue = jedisSerializer.serialize(value);
                jedis.setex(key, second, serializedValue);
                return Boolean.TRUE;
            }
        };
        return execute(callback);
    }

    public <T extends RedisPubSubListener> boolean subscribe(String name, T t) {
        Jedis jedis = jedisPool.getResource();
        try {
            jedis.subscribe(t, name);
        } catch (Exception e) {
            log.error("error occurs while operating on redis", e);
            throw new JedisDataException(e);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return Boolean.TRUE;
    }

    public <T> boolean publish(final String key, final T value) {
        Jedis jedis = jedisPool.getResource();
        try {
            String serializedValue = jedisSerializer.serialize(value);
            jedis.publish(key, serializedValue);
        } catch (Exception e) {
            log.error("error occurs while operating on redis", e);
            throw new JedisDataException(e);
        } finally {
            jedisPool.returnResource(jedis);
        }
        return Boolean.TRUE;
    }


    @Override
    public <T> T execute(JedisCallback<T> jedisCallback) {
        Jedis jedis = jedisPool.getResource();
        try {
            T rtn = jedisCallback.doInRedis(jedis);
            return rtn;
        } catch (Exception e) {
            log.error("error occurs while operating on redis", e);
            throw new JedisDataException(e);
        } finally {
            jedisPool.returnResource(jedis);
        }

    }

	@Override
	public List<String> get(final String key, final int start, final int end) {

		JedisCallback<List<String>> callback =  new JedisCallback<List<String>>() {
			@Override
			public List<String> doInRedis(Jedis jedis) {
				return jedis.lrange(key, start, end);
			}
		};

		return execute(callback);
	}

	@Override
	public boolean set(final String key, final List<String> values) {

		JedisCallback<Boolean> callback =  new JedisCallback<Boolean>() {
			@Override
			public Boolean doInRedis(Jedis jedis) {

				if (StringUtils.isNotBlank(key)) {
					jedis.del(key);
				}

				if (CollectionUtils.isNotEmpty(values)) {
					return jedis.rpush(key, values.<String>toArray(new String [values.size()])) == TRUE_NUM ;
				}

				return true;
			}
		};

		return execute(callback);
	}

	@Override
	public boolean expire(final String key, final int seconds) {

		JedisCallback<Boolean> callback =  new JedisCallback<Boolean>() {
			@Override
			public Boolean doInRedis(Jedis jedis) {
				return jedis.expire(key, seconds) == TRUE_NUM;
			}
		};

		return execute(callback);
	}

	@Override
	public Long del(final List<String> keys) {

		JedisCallback<Long> callback =  new JedisCallback<Long>() {
			@Override
			public Long doInRedis(Jedis jedis) {
				return jedis.del(keys.<String>toArray(new String [keys.size()]));
			}
		};
		return execute(callback);
	}

    public <T> boolean sadd(final String key, final T value) {
        JedisCallback<Boolean> callback = new JedisCallback<Boolean>() {
            @Override
            public Boolean doInRedis(Jedis jedis) {
                String valueStr = jedisSerializer.serialize(value);
                jedis.sadd(key, valueStr);
                return Boolean.TRUE;
            }
        };
        return execute(callback);
    }

    public <T> Set<T> smembers(final String key, final Class<T> tClass) {
        JedisCallback<Set<T>> callback = new JedisCallback<Set<T>>() {
            @Override
            public Set<T> doInRedis(Jedis jedis) {
                Set<String> redisResult = jedis.smembers(key);
                if (CollectionUtils.isNotEmpty(redisResult)) {
                    Set<T> result = new HashSet<T>();
                    for (String value : redisResult) {
                        result.add(jedisSerializer.deSerialize(value, tClass));
                    }
                    return result;
                } else {
                    return Collections.emptySet();
                }
            }
        };
        return execute(callback);
    }

	public JedisPool getJedisPool() {
        return jedisPool;
    }

    public void setJedisPool(JedisPool jedisPool) {
        this.jedisPool = jedisPool;
    }

    public JedisSerializer getJedisSerializer() {
        return jedisSerializer;
    }

    public void setJedisSerializer(JedisSerializer jedisSerializer) {
        this.jedisSerializer = jedisSerializer;
    }

}
