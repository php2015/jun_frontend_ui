package com.jeasy;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class GetFiledValueTest extends BaseJUnitTester4SpringContext {

    private AnnotationValidateModelStub filter;

    public GetFiledValueTest() {
    }

    @Before
    public void setUp() {
        filter = new AnnotationValidateModelStub();
    }

    @After
    public void tearDown() {
        filter = null;
    }

    /**
     * Test of getField method, of class GetFiledValue.
     */
    @Test
    public void testGetField() throws Exception {
        filter.setSuppleInfo("test supple info");
        String result = (String)GetFiledValue.getField(filter, "suppleInfo");
        System.out.println(result);
    }
}