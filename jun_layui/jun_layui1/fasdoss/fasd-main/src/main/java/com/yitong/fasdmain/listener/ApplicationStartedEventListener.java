package com.yitong.fasdmain.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;

@Slf4j
public class ApplicationStartedEventListener implements ApplicationListener<ApplicationStartedEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        /*System.err.println("ApplicationStartedEventListener.....start");
        for (String s : event.getArgs()) {
            System.out.println("ApplicationStartedEventListener>"+s);
        }
        System.err.println("ApplicationStartedEventListener.....end");*/
    }

}

