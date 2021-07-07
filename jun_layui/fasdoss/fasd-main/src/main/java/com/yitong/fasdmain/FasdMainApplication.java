package com.yitong.fasdmain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.servlet.MultipartConfigElement;
import java.io.File;
@Slf4j
@EnableWebMvc
@SpringBootApplication
public class FasdMainApplication {

    public static void main(String[] args) {
        SpringApplication.run( FasdMainApplication.class, args );
    }

    @Bean
    public MultipartConfigElement multipartConfigElement(){
        MultipartConfigFactory factory=new MultipartConfigFactory();
        String tempFileDir="/tmp/fasdoss";
        String location =System.getProperty("user.dir")+tempFileDir;
        log.info("location="+location);
        File tmpDir=new File(location);
        if(!tmpDir.exists()){
            tmpDir.mkdirs();
        }
        factory.setLocation(location);
        return factory.createMultipartConfig();
    }
}
