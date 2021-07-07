package com.jeasy.cache.impl;

import java.util.Map;

import org.springframework.beans.factory.InitializingBean;

import com.jeasy.cache.Cache;
import com.jeasy.cache.FindAllFactory;

import lombok.extern.slf4j.Slf4j;

/**
 * 在{@link com.jeasy.cache.impl.LazyCacheImpl}的基础上保证在{@link #afterPropertiesSet}，对数据进行一次初始化
 *
 * @author taomk
 * @param <K>
 * @param <V>
 */
@Slf4j
public class InitializedLazyCacheImpl<K, V> extends LazyCacheImpl<K, V> implements Cache<K, V>, InitializingBean {

    private FindAllFactory<K, V> factory;

    private Cache<K, V> cache;

    private int initializationThreshold;

    @Override
    public void afterPropertiesSet() throws Exception {
        new Thread() {

            @Override
            public void run() {
                int size = cache.size();
                if (size <= initializationThreshold) {
                    Map<K, V> map = factory.findAll();
                    for (Map.Entry<K, V> entry : map.entrySet()) {
                        cache.put(entry.getKey(), entry.getValue());
                    }
                }
            }
        }.start();
    }

    public void setFactory(FindAllFactory<K, V> factory) {
        super.setFactory(factory);
        this.factory = factory;
    }

    public void setInitializationThreshold(int initializationThreshold) {
        this.initializationThreshold = initializationThreshold;
    }

    public void setCache(Cache<K, V> cache) {
        this.cache = cache;
    }

    @Override
    public int size() {
        return cache.size();
    }

}
