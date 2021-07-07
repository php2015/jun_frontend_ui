package com.framework.annotation;

import java.lang.annotation.*;

/**
 * Created by john on 2015/12/8.
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Source {
    public String value() default "";
}
