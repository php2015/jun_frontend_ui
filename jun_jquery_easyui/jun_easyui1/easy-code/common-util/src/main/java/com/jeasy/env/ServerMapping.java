package com.jeasy.env;

import java.util.List;

/**
 *
 * 定义一个把url转换为一系列url的接口
 *
 * @author peng.du
 * @createTime 2012-06-01
 */
public interface ServerMapping {

    public List<String> getUrls(String url);

}
