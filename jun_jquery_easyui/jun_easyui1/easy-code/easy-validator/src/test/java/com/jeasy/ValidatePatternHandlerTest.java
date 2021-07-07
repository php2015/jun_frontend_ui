package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidatePatternHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ValidatePatternHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;
    
    //test data
    String fieldName = "gid";

	@Autowired
    private ValidatePatternHandler handler;
    
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
	public void testValidateGidMatchThePattern() {
		filter.setGid("123456");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}
	
	@Test
	public void testValidateGidNotMatchThePattern() {
		String value = "123abc";
		filter.setGid(value);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("This value is not valid format.The value is:" + value,ex.getMessage());
		}
	}
}
