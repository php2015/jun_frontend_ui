package com.jeasy.doc.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MethodDoc {

	String name() default "";

	String path() default "";

	String[] desc() default {};

	String input() default "";

	String output() default "";

	StatusEnum status() default StatusEnum.TO_DO;

	AuthorEnum author();

	String finishTime() default "";

	// 响应单个实体
	Class entity() default Object.class;

	// 响应集合
	Class lists() default Object.class;

	// 响应分页
	Class pages() default Object.class;
}
