package com.jeasy.cache.impl.ehcache;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import java.io.Serializable;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.cache.Cache;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * 利用Ehcache实现的Cache接口
 *
 * @author taomk
 * @param <K>
 * @param <V>
 */
@Slf4j
@Data
public class EhcacheImpl<K extends Serializable, V extends Serializable> implements Cache<K, V>, InitializingBean, DisposableBean {

    @Autowired
    private CacheManager cacheManager;

    private net.sf.ehcache.Cache cache;

    private String name;

    @Override
    @SuppressWarnings("unchecked")
    public V get(K key) {
        Element elem = cache.get(key);

        if (elem == null) {
            return null;
        } else {
            return (V) elem.getValue();
        }
    }

    @Override
    public void remove(K key) {
        cache.remove(key);
    }

    @Override
    public void put(K key, V value) {
        Element elem = new Element(key, value);
        cache.put(elem);
    }

    @Override
    public int size() {
        return cache.getSize();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        cache = cacheManager.getCache(name);
        cache.get(null);
    }

    @Override
    public void destroy() throws Exception {
        cacheManager.shutdown();
    }

    public void flush(){
        cache.flush();
    }
}
