package com.jeasy.redis;

import com.google.gson.Gson;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public class JedisSerializerImpl implements JedisSerializer {
    @Override
    public String serialize(Object value) {
        Gson gson = new Gson();
        String json = gson.toJson(value);
        return json;
    }

    @Override
    public <T> T deSerialize(String value, Class<T> clazz) {
        Gson gson = new Gson();
        T obj = gson.fromJson(value, clazz);
        return obj;
    }
}
