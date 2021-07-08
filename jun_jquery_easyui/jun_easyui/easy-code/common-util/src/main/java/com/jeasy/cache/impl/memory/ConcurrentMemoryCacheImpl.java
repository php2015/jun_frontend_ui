package com.jeasy.cache.impl.memory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.jeasy.cache.Cache;


/**
 * 基于ConcurrentHashMap的Cache实现
 *
 * @author taomk
 * @param <K>
 * @param <V>
 */
public class ConcurrentMemoryCacheImpl<K, V> implements Cache<K, V> {

    private Map<K, V> map = new ConcurrentHashMap<>();

    @Override
    public int size() {
        return map.size();
    }

    @Override
    public V get(K key) {
        return map.get(key);
    }

    @Override
    public void remove(K key) {
        map.remove(key);
    }

    @Override
    public void put(K key, V value) {
        map.put(key, value);
    }
}
