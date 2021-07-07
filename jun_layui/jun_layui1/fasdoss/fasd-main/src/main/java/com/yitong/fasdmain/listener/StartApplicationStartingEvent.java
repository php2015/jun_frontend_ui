package com.yitong.fasdmain.listener;

import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.ApplicationListener;


public class StartApplicationStartingEvent implements ApplicationListener<ApplicationStartingEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartingEvent event) {
        /*System.err.println("StartApplicationStartingEvent起动配置参数打印.....start");
        SpringApplication springApplication = event.getSpringApplication();
        System.err.println("StartApplicationStartingEvent起动配置参数打印.....end");*/
    }

}
