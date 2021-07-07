package com.yitong.fasdmain.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;

@Slf4j
public class ApplicationReadyEventListener implements ApplicationListener<ApplicationReadyEvent> {

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
/*        System.err.println("ApplicationReadyEventListener.....start");
        for (String s : event.getArgs()) {
            System.out.println("ApplicationReadyEventListener>"+s);
        }
        System.err.println("ApplicationReadyEventListener.....end");*/
    }

}