package com.jeasy.cache;

/**
 * 工厂接口，通过指定的参数生成值
 *
 * @author taomk
 * @param <P> 工厂的参数类型
 * @param <V> 工厂的值类型
 */
public interface Factory<P, V> {

    /**
     * 根据参数创建数据
     * @param param
     * @return
     */
    public V create(P param);

}
