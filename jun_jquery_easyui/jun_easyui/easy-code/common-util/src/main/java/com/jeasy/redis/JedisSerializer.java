package com.jeasy.redis;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public interface JedisSerializer {

    public String serialize(Object value);

    public <T> T deSerialize(String value, Class<T> clazz);
}
