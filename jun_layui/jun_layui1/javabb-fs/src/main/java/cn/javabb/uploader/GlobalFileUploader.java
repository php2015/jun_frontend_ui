package cn.javabb.uploader;

import cn.javabb.client.ApiClient;
import cn.javabb.config.ConfigProperties;
import cn.javabb.response.FileResponse;
import cn.javabb.response.FileUploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;

public class GlobalFileUploader extends BaseFileUpload implements FileUploader {


    public GlobalFileUploader(ConfigProperties configProperties) {
        super(configProperties);
    }

    @Override
    public FileUploadResponse upload(MultipartFile file, String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.upload(file);
    }

    @Override
    public FileUploadResponse upload(File file, String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.upload(file);
    }

    @Override
    public FileUploadResponse upload(InputStream is, String fileUrl,String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.upload(is,fileUrl);
    }

    @Override
    public FileUploadResponse uploadImg(MultipartFile file, String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.uploadImg(file);
    }

    @Override
    public FileResponse listFiles(String dir, String accept, String exts, String uploadType) {
        ApiClient client = this.getApiClient(uploadType);
        return client.listFiles(dir,accept,exts);
    }

    @Override
    public boolean removeFile(String fileName) {
        ApiClient client = this.getApiClient(null);
        return client.removeFile(fileName);
    }
}
