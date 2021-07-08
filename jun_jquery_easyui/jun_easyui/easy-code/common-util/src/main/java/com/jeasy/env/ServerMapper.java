package com.jeasy.env;

import java.io.IOException;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.time.DateUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 用于映射虚拟域名到具体的机器, 解决同一个配置文件需要根据环境访问不同机器的问题。
 */
public final class ServerMapper {

    private final Log logger = LogFactory.getLog(ServerMapper.class);

    private final static ServerMapper INSTANCE = new ServerMapper();

    private final ServerMappingFactory serverMappingFactory = new UrlServerMappingFactory();

    private final DucatServerMappingFactory ducatServerMappingFactory = new DucatServerMappingFactory();

    private volatile ServerMapping serverMapping;

    private volatile DucatServerMapping ducatServerMapping;

    private final Set<Refreshable> refreshables = Collections.synchronizedSet(new HashSet<Refreshable>());

    public static ServerMapper getInstance() {
        return INSTANCE;
    }

    public String getUrl(String url) {
        return getUrl(url, null);
    }

    public String getUrl(String url, Refreshable refreshable) {
        return getUrls(url, refreshable).get(0);
    }

    public List<String> getUrls(String url) {
        return getUrls(url, null);
    }

    public List<String> getUrls(String url, Refreshable refreshable) {
        if (serverMapping == null) {
            init();
        }
        if (refreshable != null) {
            refreshables.add(refreshable);
        }
        List<String> mappedUrls = serverMapping.getUrls(url);
        if (logger.isInfoEnabled()) {
            for (String mappedUrl : mappedUrls) {
                logger.info("server_mapping: " + url + " => " + mappedUrl);
            }
        }
        return mappedUrls;
    }

    /**
     * 获得当前环境的ducat配置属性
     */
    public Properties getDucatConf() {
        if (ducatServerMapping == null) {
            initDucatServerMapping();
        }
        return ducatServerMapping.getDucatProperties(Env.CURRENT);
    }

    /**
     * 初始化ducatServerMapping
     */
    private synchronized void initDucatServerMapping() throws RuntimeException {
        if (ducatServerMapping == null) {
            ducatServerMapping = getDucatServerMappingWithRetry(3);
        }
    }

    private synchronized void init() throws RuntimeException {
        if (serverMapping == null) {
            serverMapping = getServerMappingWithRetry(3);
            installTimerTask();
        }
    }

    private void installTimerTask() {
        Date now = new Date();
        ScheduledExecutorService executor = Executors.newScheduledThreadPool(3);
        long initialDelay = TimeUnit.MINUTES.toMillis(1)
                - DateUtils.getFragmentInMilliseconds(now, Calendar.MINUTE);
        long period = TimeUnit.MINUTES.toMillis(1);
        executor.scheduleAtFixedRate(new Runnable() {

            @Override
            public void run() {
                logger.debug("start to refresh.");
                try {
                    refresh();
                } catch (Exception e) {
                    logger.error("failed to refresh.");
                }
            }
        }, initialDelay, period, TimeUnit.MILLISECONDS);
    }

    private synchronized void refresh() {
        ServerMapping newServerMapping = getServerMappingWithRetry(3);
        if (!newServerMapping.equals(serverMapping)) {
            serverMapping = newServerMapping;
            logger.info("The server mapping is changed. notify all listener now.");
            notifyListeners();
        }
    }

    private void notifyListeners() {
        try {
            for (Refreshable refreshable : refreshables) {
                refreshable.refresh();
            }
        } catch (Exception e) {
            logger.error("Failed to make a listener refresh", e);
        }
    }

    private ServerMapping getServerMappingWithRetry(int retries) {
        for (int i = 0; i < retries; ++i) {
            try {
                return serverMappingFactory.getServerMapping();
            } catch (IOException e) {
                logger.error("Failed to load the server mapping", e);
            }
        }
        throw new RuntimeException("Cannot load the server mapping");
    }

    /**
     * 获取ducat配置映射
     * 
     * <pre>
     *  重试3次，不成功则抛异常
     * </pre>
     * 
     * @param retries
     * @return
     */
    private DucatServerMapping getDucatServerMappingWithRetry(int retries) {
        for (int i = 0; i < retries; ++i) {
            try {
                return ducatServerMappingFactory.getDucatServerMapping();
            } catch (IOException e) {
                logger.error("Failed to load the ducat conf by http://nuomiconf.d.xiaonei.com/servers.conf");
            }
        }
        throw new RuntimeException(
                "Cannot load the ducat server conf by http://nuomiconf.d.xiaonei.com/servers.conf");
    }

    public static void main(String[] args) {
        System.setProperty("NIUX_ENV", "TEST_STRESS");
        Properties prop = getInstance().getDucatConf();
        for (Entry<Object, Object> li : prop.entrySet()) {
            System.out.println(li.getKey() + ":" + li.getValue());
        }
    }
}
