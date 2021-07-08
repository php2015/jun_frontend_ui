package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateLengthHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;


public class ValidateSizeHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;

	@Autowired
    private ValidateLengthHandler handler;
    
    //test data
    String fieldName = "alarmNumber";
    
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
	public void testValidateLengthIsCorrect() {
		filter.setAlarmNumber("123456");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}

	@Test
	public void testValidateLengthIsNotCorrect() {
		String value = "1234567890";
		filter.setAlarmNumber(value);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("This value is not valid format.The size is:"+ value.length()+",The min size should is:0,the max size should is:9",ex.getMessage());
		}
	}

}
