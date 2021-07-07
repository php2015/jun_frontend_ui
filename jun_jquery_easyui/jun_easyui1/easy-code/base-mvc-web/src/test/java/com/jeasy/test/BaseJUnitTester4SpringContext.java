package com.jeasy.test;

import lombok.extern.slf4j.Slf4j;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Log4jConfigurer;

import java.io.FileNotFoundException;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/applicationContext-*.xml"})
@Slf4j
public class BaseJUnitTester4SpringContext {

    @BeforeClass
    public static void beforeClass() {
    }

    @Before
    public void setUp() {
        try {
            Log4jConfigurer.initLogging("/Users/TaoBangren/git@osc/easy-code/base-mvc-web/src/main/webapp/WEB-INF/log4j.xml");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @After
    public void tearDown() {
    }

    @AfterClass
    public static void afterClass() {
    }
}
