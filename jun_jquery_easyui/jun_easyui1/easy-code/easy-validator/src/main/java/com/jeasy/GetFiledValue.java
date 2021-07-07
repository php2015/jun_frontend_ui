package com.jeasy;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import lombok.extern.slf4j.Slf4j;

/**
 * Get field value by java reflect
 *
 * @author taomk
 * @version 1.0
 * @since 2014/10/20 15:44
 */
@Slf4j
public class GetFiledValue {

	/**
	 * get the specify field or property value
	 * 
	 * @param filter
	 *            validated object
	 * @param field
	 *            validated field or property
	 * @return field or property value
	 * @throws NoSuchMethodException
	 * @throws java.lang.reflect.InvocationTargetException
	 * @throws IllegalAccessException
	 */
	public static Object getField(AnnotationValidable filter, String field) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

		log.info(GetFiledValue.class.getName(), "getField()");

		String firstLetter = field.substring(0, 1).toUpperCase();
		String getMethodName = "get" + firstLetter + field.substring(1);
		Method getMethod = filter.getClass().getMethod(getMethodName);
		Object returnValue = getMethod.invoke(filter);

		log.info(GetFiledValue.class.getName(), "getField()", returnValue);
		return returnValue;
	}
}
