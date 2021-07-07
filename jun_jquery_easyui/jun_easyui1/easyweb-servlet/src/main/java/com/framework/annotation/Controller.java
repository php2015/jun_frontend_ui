package com.framework.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by 燎火 on 2015/11/15.
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface Controller {
    public String[] value() default {};
}
