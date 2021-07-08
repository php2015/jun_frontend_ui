package com.jeasy.able;

/**
 * 定义一个Refreshable的接口，在config发生变化时，调用{@link #refresh()} 通知其重新加载config
 */
public interface Refreshable {

    public void refresh();
}