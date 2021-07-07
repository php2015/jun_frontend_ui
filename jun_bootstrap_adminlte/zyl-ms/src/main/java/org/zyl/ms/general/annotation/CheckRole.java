package org.zyl.ms.general.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 检查是否有权限访问接口
 * @author yzzhouyalei@foxmail.com
 * @time 2019-05-10 22:32:08
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckRole {
	boolean required() default true;
}