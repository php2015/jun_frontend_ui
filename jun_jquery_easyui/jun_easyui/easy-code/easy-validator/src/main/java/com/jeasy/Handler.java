package com.jeasy;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;


/**
 * This is the validate process interface
 *
 * @author taomk
 * @version 1.0
 * @since 2014/10/20 15:44
 */
public interface Handler {

    public void validate(Annotation annotation, Object value) throws ValidateException;

    public void validate(AnnotationValidable validatedObj, Field field) throws ValidateException;
}
