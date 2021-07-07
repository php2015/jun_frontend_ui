package cn.javabb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

@EnableConfigurationProperties
@SpringBootApplication
@ServletComponentScan
public class JavabbFsApplication {

    public static void main(String[] args) {
        SpringApplication.run(JavabbFsApplication.class, args);
    }


}

