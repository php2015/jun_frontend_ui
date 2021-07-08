package com.jeasy.env;

import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ducatServer映射
 * 
 * @author wensong
 * @since 2013-8-23 下午4:51:30 [wensong1987@gmail.com]
 */
public class DucatServerMapping {

    private Map<Env, Properties> ducatConfMap = new ConcurrentHashMap<Env, Properties>();

    /**
     * 新增ducat相关配置
     *
     * @param env
     * @param key
     * @param value
     */
    public void addConf(Env env, String key, String value) {
        Properties ducatConf = ducatConfMap.get(env);
        if (ducatConf != null) {
            ducatConf.put(key, value);
        } else {
            ducatConf = new Properties();
            ducatConf.put(key, value);
        }
        ducatConfMap.put(env, ducatConf);
    }

    /**
     * 获得ducat属性
     *
     * @param env
     * @return
     */
    public Properties getDucatProperties(Env env) {

        Properties ducatProperties = ducatConfMap.get(env);
        if (ducatProperties == null) {
            ducatProperties = ducatConfMap.get(env.getRoot());
        }

        return ducatProperties;
    }
}
