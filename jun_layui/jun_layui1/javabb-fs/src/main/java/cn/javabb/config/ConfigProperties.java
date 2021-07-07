package cn.javabb.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "fs")
@PropertySource(value = "fs.properties")
public class ConfigProperties {

    private String storageType;

    private String serverUrl;

    private String rootPath;

    private String uploadType;

    private Boolean useSm;

    private Boolean useNginx;

    private String nginxUrl;

    private String qiniuBucketName;

    private String qiniuAccessKey;

    private String qiniuSecretKey;

    private String qiniuBasePath;

    private String writeWeb;

}
