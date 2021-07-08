package com.jeasy.redis;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public class NiuxJedisPoolFactoryBean implements FactoryBean, InitializingBean, DisposableBean {

    private static final String MASTER_URL = "127.0.0.1:6637";

    private static final String SLAVE_URL = "127.0.0.1:6638";

    private volatile JedisPool jedisPool;

    private JedisPoolConfig jedisPoolConfig;

    private boolean master;

    @Override
    public void afterPropertiesSet() {
        String[] servers;
        if (master) {
            servers = MASTER_URL.split(":");
        } else {
            servers = SLAVE_URL.split(":");
        }

        String ip = servers[0];
        int port = NumberUtils.toInt(servers[1]);

        jedisPool = new JedisPool(jedisPoolConfig, ip, port);

    }

    @Override
    public Object getObject() throws Exception {
        return jedisPool;
    }

    @Override
    public Class getObjectType() {
        return JedisPool.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    @Override
    public void destroy() throws Exception {
        jedisPool.destroy();
    }

    public JedisPoolConfig getJedisPoolConfig() {
        return jedisPoolConfig;
    }

    public void setJedisPoolConfig(JedisPoolConfig jedisPoolConfig) {
        this.jedisPoolConfig = jedisPoolConfig;
    }

    public boolean isMaster() {
        return master;
    }

    public void setMaster(boolean master) {
        this.master = master;
    }
}
