package com.jeasy.base.aspect;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.jeasy.date.DateExUtils;
import com.jeasy.doc.util.MonitorUtils;
import com.jeasy.json.GsonUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * Service层日志拦截器
 * @author taomk
 * @version 1.0
 * @since 15-5-22 下午7:57
 */
@Slf4j
@Aspect
public class ServiceCostLogAspect {

	/**
	 * Pointcut
	 * 定义Pointcut，Pointcut的名称为aspectjMethod()，此方法没有返回值和参数
	 * 该方法就是一个标识，不进行调用
	 */
	@Pointcut("execution(public * com.jeasy..service.*.*(..))")
	private void aspectjMethod(){}

	@Around(value = "aspectjMethod()")
	public Object aroundAdvice(ProceedingJoinPoint pjp) throws Throwable {

		String className = pjp.getTarget().getClass().getName();
		String methodName = pjp.getSignature().getName();
		Object[] args = pjp.getArgs();

		StringBuilder logMsg = new StringBuilder("\nService execute report -------- " + DateExUtils.currentDatetime() + " ----------------------------------------");
		logMsg.append("\nService   : ").append(className);
		logMsg.append("\nMethod    : ").append(methodName);
		logMsg.append("\nParameter : ").append(Joiner.on(",").join(Lists.transform(Arrays.asList(args), new Function<Object, String>() {
			@Override
			public String apply(Object input) {
				return GsonUtils.toJson(input);
			}
		})));

		long startTime = System.currentTimeMillis();
		Object retVal = null;
		try {
			retVal = pjp.proceed();

			MonitorUtils.incTimeForService(className, methodName, System.currentTimeMillis() - startTime);

			logMsg.append("\nResult    : ").append(GsonUtils.toJson(retVal));
			logMsg.append("\nCost Time : ").append(System.currentTimeMillis() - startTime).append(" ms");
			logMsg.append("\n--------------------------------------------------------------------------------------------");
			log.info(logMsg.toString());
			return retVal;
		} catch (Throwable e) {
			MonitorUtils.incCountForException(className, methodName);
			log.error(className + "."+ methodName + " Occur Exception : ", e);
			throw e;
		}
	}
}