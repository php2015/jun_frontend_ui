package cn.javabb.uploader;

import cn.javabb.client.ApiClient;
import cn.javabb.client.LocalApiClient;
import cn.javabb.client.QiniuApiClient;
import cn.javabb.config.ConfigProperties;
import cn.javabb.exception.FileException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class BaseFileUpload {
    @Autowired
    ConfigProperties configProperties;

    public BaseFileUpload(ConfigProperties configProperties){
        this.configProperties = configProperties;
    }

    ApiClient getApiClient(String uploadType){
        String storageType = null;
        if (null == configProperties || StringUtils.isEmpty((storageType = configProperties.getStorageType()))) {
            throw new FileException("[文件服务]当前系统暂未配置文件服务相关的内容！");
        }
        ApiClient client = null;
        switch (storageType){
            case "local":
                client = new LocalApiClient().init(
                        configProperties.getServerUrl(),
                        configProperties.getUseSm(),
                        configProperties.getServerUrl(),
                        configProperties.getUseNginx(),
                        configProperties.getNginxUrl(),
                        configProperties.getRootPath(),
                        uploadType);
                break;
            case "qiniu":
                client = new QiniuApiClient().init(
                        configProperties.getQiniuAccessKey(),
                        configProperties.getQiniuSecretKey(),
                        configProperties.getQiniuBucketName(),
                        configProperties.getQiniuBasePath(),
                        uploadType);
                break;

            case "aliyunOss":
                break;
            default:
                break;
        }
        if(null == client){
            throw new FileException("[文件服务]当前系统暂未配置文件服务相关的内容！");
        }
        return client;
    }
}
