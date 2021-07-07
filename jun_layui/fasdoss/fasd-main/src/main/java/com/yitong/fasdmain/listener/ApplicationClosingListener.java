package com.yitong.fasdmain.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.stereotype.Component;

/**
 * 起动参数打印
 */
@Component
@Slf4j
public class ApplicationClosingListener implements ApplicationListener<ContextClosedEvent> {

    @Override
    public void onApplicationEvent(ContextClosedEvent event) {
        log.warn("系统正在停止中。。。。。");
        log.info("系统正在停止中。。。。。");
        log.error("系统正在停止中。。。。。");
    }




}
