package cn.javabb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import tk.mybatis.spring.annotation.MapperScan;

@EnableTransactionManagement
@SpringBootApplication
@ServletComponentScan
@MapperScan(basePackages = {
    "cn.javabb.**.mapper"
})
public class BmsBootApplication{

    public static void main(String[] args) {
        SpringApplication.run(BmsBootApplication.class, args);
        System.out.println("项目启动成功");

    }
}
