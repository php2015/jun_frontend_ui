package com.framework.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by 燎火 on 2015/11/15.
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface RequestMapping {
    public String value() default "";
    public String params() default "";
}
