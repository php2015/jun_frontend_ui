package com.yitong.fasdmain.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationPreparedEvent;
import org.springframework.context.ApplicationListener;

/**
 * 起动参数打印
 */
@Slf4j
public class ApplicationPreparedEventListener implements ApplicationListener<ApplicationPreparedEvent> {

    @Override
    public void onApplicationEvent(ApplicationPreparedEvent event) {
        log.info("ApplicationPreparedEventListener起动配置参数打印.....start");
        log.info("Java: {}, {}, {}, {}", new Object[]{System.getProperty("java.version"), System.getProperty("java.vm.name"), System.getProperty("java.vm.vendor"), System.getProperty("java.vm.version")});
        log.info("OS: {}, {}, {}", new Object[]{System.getProperty("os.name"), System.getProperty("os.version"), System.getProperty("os.arch")});
    }

}
