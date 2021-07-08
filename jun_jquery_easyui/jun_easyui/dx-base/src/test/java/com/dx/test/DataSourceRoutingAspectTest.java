package com.dx.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.dx.service.SlaveService;

/**
 * @Description：DataSourceRoutingAspectTest
 * @author：Wangzhixuan 
 * @date：2015年8月19日 下午5:23:24
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "classpath:springmvc-servlet.xml",
        "classpath:spring-config.xml"
})
public class DataSourceRoutingAspectTest {

    @Autowired
    private SlaveService slaveService;

    @Test
    public void testFindAllShop() {
        Integer count = slaveService.count();
        System.out.println(count);
    }
}

