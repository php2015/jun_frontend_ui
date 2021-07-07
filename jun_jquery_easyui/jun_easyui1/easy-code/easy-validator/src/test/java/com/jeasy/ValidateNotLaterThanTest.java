package com.jeasy;

import java.text.SimpleDateFormat;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateNotLaterThanHandler;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;


public class ValidateNotLaterThanTest extends BaseJUnitTester4SpringContext {

	//test object
    private AnnotationValidateModelStub filter;

	@Autowired
    private ValidateNotLaterThanHandler handler;
    
   //test date
    String sTime = "01/03/2010,08";
    String eTime = "01/07/2010,08";
    String newTime = "01/07/2011,08";
    String fieldName = "startTime";

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy,HH");

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
	public void testValidateStartTimeBeforeThenEndTime() throws Exception {
		filter.setStartTime(sdf.parse(sTime));
		filter.setEndTime(sdf.parse(eTime));
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
		}catch(Exception e){
			fail("There should not throw Exception.");
		}
	}
	
	@Test
	public void testValidateStartTimeNotBeforeThenEndTime() throws Exception {
		filter.setStartTime(sdf.parse(eTime));
		filter.setEndTime(sdf.parse(sTime));
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("Start time should not later than end time."+"The startTime is:" + sdf.parse(eTime) + ",the endTime is:" + sdf.parse(sTime),ex.getMessage());
		}
	}

	@Test
	public void testValidateStartTimeOrEndTimeIsNull() throws Exception {
		filter.setStartTime(sdf.parse(eTime));
		try{
			handler.validate(filter, filter.getClass().getDeclaredField(fieldName));
			fail("Exception should be thrown.");
		}catch(Exception ex){
			assertEquals("Start time should not later than end time."+"StartTime or endTime is null.The startTime is:" + sdf.parse(eTime) + ",the endTime is:" + null,ex.getMessage());
		}
	}
}
