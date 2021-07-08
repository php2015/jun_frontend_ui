package com.jeasy.redis;

import java.util.List;
import java.util.Set;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public interface RedisTemplate {

    /**
     * 发布消息
     */
    public <T> boolean publish(final String key, final T value);

    /**
     * 订阅消息
     */
    public <T extends RedisPubSubListener> boolean subscribe(String name, T t);

    /**
     * 入队
     */
    public <T> boolean enqueue(final String key, final T value);

    /**
     * 出队
     */
    public <T> T dequeue(final String key, final Class<T> clazz);

    public long getLength(final String key);

	public <T> T get(String key, final Class<T> clazz);

    public <T> boolean set(String key, T value);

    public <T> boolean setex(String key, int second, T value);

    public <T> T execute(JedisCallback<T> jedisCallback);

	public List<String> get(String key, int start, int end);

	public boolean set(String key, List<String> values);

	public boolean expire(String key, int seconds);

	public Long del(List<String> keys);

    // 对集合set的支持,
    public <T> boolean sadd(final String key, final T value);
    public <T> Set<T> smembers(final String key, final Class<T> tClass);
}
