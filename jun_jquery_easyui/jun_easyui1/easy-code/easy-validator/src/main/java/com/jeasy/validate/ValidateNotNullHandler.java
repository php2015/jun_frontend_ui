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
 * Validate the @ValidateNotNull annotation
 *
 * @author taomk
 * @version 1.0
 * @since 2014/10/20 15:44
 */
@Slf4j
@Service("validateNotNullHandler")
public class ValidateNotNullHandler implements Handler {

	@Override
	public void validate(Annotation annotation, Object value) throws ValidateException {
		log.info(this.getClass().getName(), "validate()");

		if (ValidateNotNull.class.isInstance(annotation)) {
			checkNotNull(annotation, value);
		}

		log.info(this.getClass().getName(), "validate()");
	}

	private void checkNotNull(Annotation annotation, Object value) throws ValidateException {
		log.info(this.getClass().getName(), "checkNotNull()");

		String message = ((ValidateNotNull)annotation).message();
		Object dest;

		try {
			dest = value;
		} catch (Exception ex) {
			log.info("Get field value or cast value error. Error message: " + ex.getMessage(), ex);
			throw new ValidateException(ex.getMessage(), ex);
		}

		if (dest == null) {
			log.info("Validate fail. Error message: validate value is : null");
			throw new ValidateException(message);
		}

		log.info(this.getClass().getName(), "checkNotNull()");
	}

	public void validate(AnnotationValidable validatedObj, Field field) throws ValidateException {
		log.info(this.getClass().getName(), "validate()");

		if (field.isAnnotationPresent(ValidateNotNull.class)) {
			checkNotNull(validatedObj, field);
		}

		log.info(this.getClass().getName(), "validate()");
	}

	private void checkNotNull(AnnotationValidable filter, Field field) throws ValidateException {
		log.info(this.getClass().getName(), "checkNotNull()");

		String message = field.getAnnotation(ValidateNotNull.class).message();
		Object dest;

		try {
			dest = GetFiledValue.getField(filter, field.getName());
		} catch (Exception ex) {
			log.info("Get field value or cast value error. Error message: " + ex.getMessage(), ex);
			throw new ValidateException(ex.getMessage(), ex);
		}

		if (dest == null) {
			log.info("Validate fail. Error message: validate value is:null");
			throw new ValidateException(message);
		}

		log.info(this.getClass().getName(), "checkNotNull()");
	}
}
