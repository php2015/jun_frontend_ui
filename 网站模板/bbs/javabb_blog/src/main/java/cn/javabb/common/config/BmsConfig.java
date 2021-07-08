package cn.javabb.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix="bms")
public class BmsConfig {
    //文件上传路径
    private String fileUploadPath;
    //图片上传路径，wangEditor使用
    private String imgUploadPath;
}
