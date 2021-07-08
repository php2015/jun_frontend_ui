package cn.javabb.javabbfs;

import cn.javabb.config.ConfigProperties;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JavabbFsApplicationTests {

    @Autowired
    ConfigProperties configProperties;

    @Test
    public void contextLoads() {
    }

    @Test
    public void print(){
        System.out.println(configProperties.getUseNginx());
        System.out.println(configProperties.getWriteWeb());
        System.out.println(configProperties.getQiniuBucketName());
    }

}

