package com.jeasy.cache;


/**
 * 一个通用的Cache接口。
 *
 * @author taomk
 * @param <K> Cache的键类型
 * @param <V> Cache的值类型
 */
public interface Cache<K, V> {

    /**
     * 查询缓存目前的大小
     * @return
     */
    public int size();

    /**
     * 根据键查询缓存条目的值
     * @param key
     * @return 如果未缓存则返回null，否则返回键对应的值
     */
    public V get(K key);

    /**
     * 从缓存中删除对应的键-值对
     * @param key
     */
    public void remove(K key);

    /**
     * 將对应的键-值放入缓存
     * @param key
     * @param value
     */
    public void put(K key, V value);

}
