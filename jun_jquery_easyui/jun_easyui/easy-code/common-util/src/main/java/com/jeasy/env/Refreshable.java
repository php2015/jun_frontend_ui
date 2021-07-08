package com.jeasy.env;

/**
 * 定义一个Refreshable的接口，在config发生变化时，调用{@link #refresh()} 通知其重新加载config
 *
 * @author peng.du
 * @createTime 2012-06-01
 */
public interface Refreshable {

    public void refresh();

}
