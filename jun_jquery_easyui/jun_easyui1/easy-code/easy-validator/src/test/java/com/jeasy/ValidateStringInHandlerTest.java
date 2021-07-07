package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateStringInHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ValidateStringInHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
	private AnnotationValidateModelStub filter;

	@Autowired
	private ValidateStringInHandler handler;
	
	//test data
	String fieldName = "alarmType";
	
	@Before
	public void setUp() {
		filter = new AnnotationValidateModelStub();
	}

	@After
	public void tearDown() {
		filter = null;
		handler = null;
	}

	@Test
	public void testValidateStringIsInTheGivenValue() {
		filter.setAlarmType("Communication");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}

	@Test
	public void testValidateStringIsNotInTheGivenValue() {
		String value = "test";
		filter.setAlarmType(value);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("The value is not expected.this field value is:"+value+",the excepted value is:[Communication, Environment, Equipment, Processing, Quality of Service, All]",ex.getMessage());
		}
	}
}
