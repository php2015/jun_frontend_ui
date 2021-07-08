package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateDigitHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ValidateDigitHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;
    
    //test data
    String fieldName = "alarmNumber";

	@Autowired
    private ValidateDigitHandler handler;

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
	public void testValidateIsDigit() {
		filter.setAlarmNumber("123456");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}
	
	@Test
	public void testValidateIsEmpty() {
		filter.setAlarmNumber("");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}
	
	@Test
	public void testValidateIsNotDigit() {
		String value = "123abc";
		filter.setAlarmNumber(value);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("The value should be digit only.The value is:" + value,ex.getMessage());
		}
	}
}
