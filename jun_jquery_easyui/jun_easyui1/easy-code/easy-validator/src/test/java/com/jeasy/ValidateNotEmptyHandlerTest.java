package com.jeasy;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateNotEmptyHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class ValidateNotEmptyHandlerTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;

	@Autowired
    private ValidateNotEmptyHandler handler;
    
    String fieldName = "moList";
    
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
	public void testValidateCollectionNotEmpty() {
		List<Object> moLists = new ArrayList<Object>();
		for(int i = 0; i < 3; i++){
			Object mo = new Object();
			moLists.add(mo);
		}
		filter.setMoList(moLists);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}
	
	@Test
	public void testValidateCollectionEmpty() {
		List<Object> moLists = new ArrayList<>();
		filter.setMoList(moLists);
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("This collection should not to be empty.The collection of "+fieldName+" size is:0",ex.getMessage());
		}
	}

}
