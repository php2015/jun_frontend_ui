package cn.javabb.uploader;

import cn.javabb.client.ApiClient;
import cn.javabb.config.ConfigProperties;
import cn.javabb.response.FileResponse;

public class GlobalFileShower extends BaseFileUpload {

    public GlobalFileShower(ConfigProperties configProperties) {
        super(configProperties);
    }
    public FileResponse show(String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.listFiles(null,null,null);
    }
}
