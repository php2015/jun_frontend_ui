package com.jeasy.validate;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

import org.springframework.stereotype.Service;

import com.jeasy.AnnotationValidable;
import com.jeasy.GetFiledValue;
import com.jeasy.Handler;
import com.jeasy.ValidateException;

import lombok.extern.slf4j.Slf4j;

/**
 * Validate the @long annotation
 *
 * @author taomk
 * @version 1.0
 * @since 2014/10/20 15:44
 */
@Slf4j
@Service("validateLongHandler")
public class ValidateLongHandler implements Handler {

	@Override
	public void validate(Annotation annotation, Object value) throws ValidateException {
		log.info(this.getClass().getName(), "validate()");

		if (ValidateLong.class.isInstance(annotation)) {
			checkDigit(annotation, value);
		}

		log.info(this.getClass().getName(), "validate()");
	}

	/**
	 * validate the long type
	 *
	 * @param annotation
	 *            validated annotation
	 * @param value
	 *            validated field or property
	 * @throws com.jeasy.ValidateException
	 */
	private void checkDigit(Annotation annotation, Object value) throws ValidateException {
		log.info(this.getClass().getName(), "checkLong()");

		ValidateLong validateLong = (ValidateLong) annotation;
		long min = validateLong.min();
		long max = validateLong.max();
		String message = validateLong.message();

		Long destValue;
		try {
			destValue = (Long) value;
		} catch (Exception ex) {
			log.info("Get field value or cast value error. Error message: " + ex.getMessage(), ex);
			throw new ValidateException(ex.getMessage(), ex);
		}

		if(destValue == null) {
			return; //NULL value is allowed.
		}

		if (destValue < min) {
			log.info("Validate fail. Error message: validate value is:{0},min value is:{1}", new Long[]{destValue, min});
			throw new ValidateException(message);
		}

		if (destValue > max) {
			log.info("Validate fail. Error message: validate value is:{0},max value is:{1}", new Long[]{destValue, max});
			throw new ValidateException(message);
		}

		log.info(this.getClass().getName(), "checkLong()");
	}

	public void validate(AnnotationValidable validatedObj, Field field) throws ValidateException {
		log.info(this.getClass().getName(), "validate()");

		if (field.isAnnotationPresent(ValidateLong.class)) {
			checkLong(validatedObj, field);
		}

		log.info(this.getClass().getName(), "validate()");
	}

	/**
	 * validate the long type
	 *
	 * @param filter
	 *            validated object
	 * @param field
	 *            validated field or property
	 * @throws com.jeasy.ValidateException
	 */
	private void checkLong(AnnotationValidable filter, Field field) throws ValidateException {
		log.info(this.getClass().getName(), "checkLong()");

		ValidateLong annotation = field.getAnnotation(ValidateLong.class);
		long min = annotation.min();
		long max = annotation.max();
		String message = annotation.message();

		Long destValue;
		try {
			destValue = (Long) GetFiledValue.getField(filter, field.getName());
		} catch (Exception ex) {
			log.info("Get field value or cast value error. Error message: " + ex.getMessage(), ex);
			throw new ValidateException(ex.getMessage(), ex);
		}

        if(destValue == null) {
        	return; //NULL value is allowed.
		}

		long value = destValue;

        if (value < min) {
        	log.info("Validate fail. Error message: validate value is:{0},min value is:{1}", new Long[]{value, min});
            throw new ValidateException(message);
		}

        if (value > max) {
        	log.info("Validate fail. Error message: validate value is:{0},max value is:{1}", new Long[]{value, max});
            throw new ValidateException(message);
        }

		log.info(this.getClass().getName(), "checkLong()");
	}
}
