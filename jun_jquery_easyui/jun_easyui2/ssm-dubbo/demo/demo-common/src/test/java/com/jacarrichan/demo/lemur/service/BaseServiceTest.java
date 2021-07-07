package com.jacarrichan.demo.lemur.service;

import lombok.extern.slf4j.Slf4j;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = false)
@Transactional
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
@Slf4j
public abstract class BaseServiceTest {
	@Autowired
	protected ApplicationContext context;
	@Autowired
	protected JdbcTemplate jdbcTemplate;

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