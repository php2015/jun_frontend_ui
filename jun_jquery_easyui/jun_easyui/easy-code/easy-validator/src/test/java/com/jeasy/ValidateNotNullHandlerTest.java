package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateNotNullHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;


public class ValidateNotNullHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;
    
    //test data
    String fieldName = "suppleInfo";

	@Autowired
    private ValidateNotNullHandler handler;
    
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
	public void testValidateSuppleInfoIsNotNull() {
		filter.setSuppleInfo("test supple info");
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}

	@Test
	public void testValidateSuppleInfoIsNull() {
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("This value should not null.But the value of suppleInfo is Null.",ex.getMessage());
		}
	}

}
