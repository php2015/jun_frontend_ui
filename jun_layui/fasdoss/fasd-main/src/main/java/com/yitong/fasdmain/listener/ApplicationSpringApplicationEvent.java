package com.yitong.fasdmain.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.SpringApplicationEvent;
import org.springframework.context.ApplicationListener;


@Slf4j
public class ApplicationSpringApplicationEvent implements ApplicationListener<SpringApplicationEvent> {


    @Override
    public void onApplicationEvent(SpringApplicationEvent event) {
        log.info("启动监听事件>>ApplicationSpringApplicationEvent.....start");


    }
}

