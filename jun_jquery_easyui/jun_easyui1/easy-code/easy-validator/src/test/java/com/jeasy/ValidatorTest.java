package com.jeasy;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.validate.ValidateInt;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class ValidatorTest extends BaseJUnitTester4SpringContext {

	@Autowired
	private Validator validator;

	@Before
	public void setUp() {
	}

	@After
	public void tearDown() {
	}

	@Test
	public void testValidate_validateFieldInCurrentClass() {
		AnnotationValidableNormalImp validatedObj = new AnnotationValidableNormalImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_noMatchedValidAnnotationOnFieldInCurrentClass() {
		NoMatchedAnnotationImp validatedObj = new NoMatchedAnnotationImp();
		try {
			validator.validate(validatedObj);
			assertTrue("There should not validation found", true);
		}
		catch(ValidateException ex)
		{
			fail("Can not be here, the exception should never be thrown.");
		}
	}
	
	@Test
	public void testValidate_noValidateHandlerForTheAnnotationInCurrentClass() {
		NoHandlerAnnotationImp validatedObj = new NoHandlerAnnotationImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}

	@Test
	public void testValidate_validateFieldInSuperClass() {
		SubclassOfAnnotationValidableNormalImp validatedObj = new SubclassOfAnnotationValidableNormalImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_noMatchedValidAnnotationOnFieldInSuperClass() {
		SubclassOfNoMatchedAnnotationImp validatedObj = new SubclassOfNoMatchedAnnotationImp();
		try {
			validator.validate(validatedObj);
			assertTrue("There should not validation found", true);
		}
		catch(ValidateException ex)
		{
			fail("Can not be here, the exception should never be thrown.");
		}
	}
	
	@Test
	public void testValidate_noValidateHandlerForTheAnnotationInSuperClass() {
		SubclassOfNoHandlerAnnotationImp validatedObj = new SubclassOfNoHandlerAnnotationImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_validateFieldInSuperOfSuperClass() {
		SubclassOfSubclassOfAnnotationValidableNormalImp validatedObj = new SubclassOfSubclassOfAnnotationValidableNormalImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_noMatchedValidAnnotationOnFieldInSuperOfSuperClass() {
		SubclassOfSubclassOfNoMatchedAnnotationImp validatedObj = new SubclassOfSubclassOfNoMatchedAnnotationImp();
		try {
			validator.validate(validatedObj);
			assertTrue("There should not validation found", true);
		}
		catch(ValidateException ex)
		{
			fail("Can not be here, the exception should never be thrown.");
		}
	}
	
	@Test
	public void testValidate_noValidateHandlerForTheAnnotationInSuperOfSuperClass() {
		SubclassOfSubclassOfNoHandlerAnnotationImp validatedObj = new SubclassOfSubclassOfNoHandlerAnnotationImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_validateFieldInContainerOfValidatedClass() {
		ContainerOfAnnotationValidableNormalImp validatedObj = new ContainerOfAnnotationValidableNormalImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getImpl().getErrorMessageFragment()) >= 0);
		}
	}
	
	@Test
	public void testValidate_validateFieldInContainerOfContainerOfValidatedClass() {
		ContainerOfContainerOfAnnotationValidableNormalImp validatedObj = new ContainerOfContainerOfAnnotationValidableNormalImp();
		try {
			validator.validate(validatedObj);
			fail("Can not be here, the exception should be thrown.");
		}
		catch(ValidateException ex)
		{
			assertTrue("Actual Error Message: " + ex.getMessage(), ex.getMessage().indexOf(validatedObj.getImpl().getImpl().getErrorMessageFragment()) >= 0);
		}
	}
}

class AnnotationValidableNormalImp implements AnnotationValidable {
	
	public static final int MIN = 1;
	
	@ValidateInt(min=MIN)
	private int size = 0;

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
	public String getErrorMessageFragment() {
		return ",The min value should is:" + MIN;
	}
	
}

class SubclassOfAnnotationValidableNormalImp extends AnnotationValidableNormalImp {
	
}

class SubclassOfSubclassOfAnnotationValidableNormalImp extends SubclassOfAnnotationValidableNormalImp {
	
}

class ContainerOfAnnotationValidableNormalImp implements AnnotationValidable {
	
	AnnotationValidableNormalImp impl = new AnnotationValidableNormalImp();

	public AnnotationValidableNormalImp getImpl() {
		return impl;
	}

	public void setImpl(AnnotationValidableNormalImp impl) {
		this.impl = impl;
	}
	
}

class ContainerOfContainerOfAnnotationValidableNormalImp implements AnnotationValidable {
	
	ContainerOfAnnotationValidableNormalImp impl = new ContainerOfAnnotationValidableNormalImp();

	public ContainerOfAnnotationValidableNormalImp getImpl() {
		return impl;
	}

	public void setImpl(ContainerOfAnnotationValidableNormalImp impl) {
		this.impl = impl;
	}
	
}

//
//here is ValidatEIntt, not ValidateInt
//
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface ValidatEIntt {

    int min() default Integer.MIN_VALUE;

    int max() default Integer.MAX_VALUE;

    String message() default "Value of the integer is not in expected scope.";
}

class NoMatchedAnnotationImp implements AnnotationValidable {
	
	public static final int MIN = 1;
	
	//here is ValidatEIntt, not ValidateInt
	@ValidatEIntt(min=MIN)
	private int size = 0;

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
}

class SubclassOfNoMatchedAnnotationImp extends NoMatchedAnnotationImp {
	
}

class SubclassOfSubclassOfNoMatchedAnnotationImp extends SubclassOfNoMatchedAnnotationImp {
	
}


//
//here is ValidateNoHandler
//
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface ValidateNoHandler {

  int min() default Integer.MIN_VALUE;

  int max() default Integer.MAX_VALUE;

  String message() default "Value of the integer is not in expected scope.";
}

class NoHandlerAnnotationImp implements AnnotationValidable {
	
	public static final int MIN = 1;
	
	//here is ValidatEIntt, not ValidateInt
	@ValidateNoHandler(min=MIN)
	private int size = 0;

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
	public String getErrorMessageFragment() {
		return "Can not get the handler";
	}
	
}

class SubclassOfNoHandlerAnnotationImp extends NoHandlerAnnotationImp {
	
}

class SubclassOfSubclassOfNoHandlerAnnotationImp extends SubclassOfNoHandlerAnnotationImp {
	
}