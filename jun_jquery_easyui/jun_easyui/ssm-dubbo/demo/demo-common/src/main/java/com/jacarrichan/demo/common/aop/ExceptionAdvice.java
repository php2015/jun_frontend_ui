package com.jacarrichan.demo.common.aop;

import java.lang.reflect.Method;

import lombok.extern.slf4j.Slf4j;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;

import com.jacarrichan.demo.common.models.AppCoreException;
import com.jacarrichan.demo.common.models.Response;

@Aspect
@Slf4j
public class ExceptionAdvice {
	/**
	 * 所有返回结果是response的方法都为切入点
	 */
	@Pointcut("execution(public com.jacarrichan.demo.common.models.Response com.jacarrichan.demo.lemur.service..*.*(..))")
	public void all() {
	}

	@Around(value = "all()")
	public Object transferException(ProceedingJoinPoint pjp) throws Throwable {
		Method method = ((MethodSignature) pjp.getSignature()).getMethod();
		Class<?> methodReturnType = method.getReturnType();
		Object result = null;
		try {
			result = pjp.proceed();
		} catch (Exception e) {
			log.error("exception  occurred..............", e);
			if (methodReturnType.isAssignableFrom(Response.class)) {
				if (e instanceof AppCoreException) {
					String errorCode = ((AppCoreException) e).getErrorCode();
					String errorMsg = ((AppCoreException) e).getErrorMsg();
					result = new Response<>(errorCode, errorMsg);
				}
			}
		}
		return result;
	}
}
