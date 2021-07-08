package com.jeasy;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.extern.slf4j.Slf4j;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:/applicationContext-*.xml"})
@Slf4j
public class BaseJUnitTester4SpringContext {

    @BeforeClass
    public static void beforeClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @AfterClass
    public static void afterClass() {
    }
}
