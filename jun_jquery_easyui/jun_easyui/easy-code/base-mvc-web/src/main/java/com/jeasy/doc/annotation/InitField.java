package com.jeasy.doc.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.apache.commons.lang3.StringUtils;

/**
 * @author taomk
 * @version 1.0
 * @since 15-8-25 上午11:58
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER})
public @interface InitField {

	// 与请求参数名一致
	String name() default StringUtils.EMPTY;

	// 构造参数值
	String value() default StringUtils.EMPTY;

	// 参数描述
	String desc() default StringUtils.EMPTY;
}
