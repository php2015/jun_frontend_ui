package com.jacarrichan.demo.lemur.service;

import lombok.extern.slf4j.Slf4j;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
@Slf4j
public abstract class BaseServiceTest {
	@Autowired
	protected ApplicationContext context;

	@BeforeClass
	public static void beforeClass() {
		log.error("===============================");
	}

	@Before
	public void before() {
		log.debug(this.toString() + " .....  init");
	}

	@After
	public void after() {
		System.out.println("===============================");
	}

}