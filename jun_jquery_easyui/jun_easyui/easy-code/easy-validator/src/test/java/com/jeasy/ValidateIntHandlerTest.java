package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateIntHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ValidateIntHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;
    
    //test data
    String fieldName = "maxRows";

	@Autowired
    private ValidateIntHandler handler;
    
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
	public void testValidateMaxRowsIsCorrect() {
		filter.setMaxRows(10);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}

	@Test
	public void testValidateMaxRowsIsNotCorrect() {
		Integer value = -10;
		filter.setMaxRows(value);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("Value of the integer is not in expected scope.The value is:" + value+",The min value should is:1",ex.getMessage());
		}
	}
}
