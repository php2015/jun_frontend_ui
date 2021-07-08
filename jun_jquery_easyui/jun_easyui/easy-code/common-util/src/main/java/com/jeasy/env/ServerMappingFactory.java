package com.jeasy.env;

import java.io.IOException;

/**
 * ServerMapping的工厂
 *
 * @author peng.du
 * @createTime 2012-06-01
 */
public interface ServerMappingFactory {

    public ServerMapping getServerMapping() throws IOException;

}
