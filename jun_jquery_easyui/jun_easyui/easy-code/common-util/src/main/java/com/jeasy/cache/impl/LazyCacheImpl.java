package com.jeasy.cache.impl;


import com.jeasy.cache.Cache;
import com.jeasy.cache.Factory;

/**
 * 一个懒加载的缓存的实现
 *
 * @author taomk
 * @param <K>
 * @param <V>
 */
public class LazyCacheImpl<K, V> implements Cache<K, V> {

    /**
     * 用于懒加载时根据键生成值的工厂
     */
    private Factory<K, V> factory;

    /**
     * 缓存
     */
    private Cache<K, V> cache;

    /**
     * 根据键查询值，当键未在缓存中存在时，调用工厂生成值并将其放入缓存
     * @param key
     * @return
     */
    @Override
    public V get(K key) {
        V value = cache.get(key);
        if (value == null) {
            value = factory.create(key);
            cache.put(key, value);
        }
        return value;
    }

    @Override
    public void remove(K key) {
        cache.remove(key);
    }

    @Override
    public final void put(K key, V value) {
    }

    public void setFactory(Factory<K, V> factory) {
        this.factory = factory;
    }

    public void setCache(Cache<K, V> cache) {
        this.cache = cache;
    }

    @Override
    public int size() {
        return cache.size();
    }

}
