package com.jeasy.redis;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class RedisUtils {

	private RedisUtils(){
	}

    private static JedisSerializer jedisSerializer = new JedisSerializerImpl();

    public static <T> T transform(String value, Class<T> tClass) {
        return jedisSerializer.deSerialize(value, tClass);
    }
}
