package com.jeasy.cache;

import java.util.Map;

/**
 * 扩展了工厂接口，使得在其基础上，还有將所有可能参数-值对一次查询得到的接口
 *
 * @author taomk
 * @param <P>
 * @param <V>
 */
public interface FindAllFactory<P, V> extends Factory<P, V> {

    /**
     * {@inheritDoc}
     */
    @Override
    public V create(P param);

    /**
     * 查询所有可能的参数-值对
     * @return
     */
    public Map<P, V> findAll();

}
