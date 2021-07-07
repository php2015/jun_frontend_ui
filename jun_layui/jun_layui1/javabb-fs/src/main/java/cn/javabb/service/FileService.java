package cn.javabb.service;

import cn.javabb.config.ConfigProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {

    @Autowired
    ConfigProperties configProperties;

    public void test(){
        System.out.println("serverUrl:"+configProperties.getServerUrl());
    }


}
