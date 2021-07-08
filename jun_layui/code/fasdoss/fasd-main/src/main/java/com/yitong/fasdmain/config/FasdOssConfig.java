package com.yitong.fasdmain.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 配置文件
 */
@Component
@Data
@ConfigurationProperties(prefix = "fasd-oss.config")
public class FasdOssConfig {

    /**
     * 配置上传文件位置
     */
    private String filehome;



}
