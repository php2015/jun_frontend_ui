package com.jeasy.doc.interceptor;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

import com.jeasy.doc.util.MonitorUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * 对拦截的方法进行计数和计时统计，
 * 通过java.util.concurrent包减少对拦截方法本身的性能影响。
 * @author taomk
 * @version 1.0
 * @since 2014/9/17 10:26
 */
@Slf4j
public class TimeCostDaoInterceptor implements MethodInterceptor {

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        long startTime = System.currentTimeMillis();
        try {
            return invocation.proceed();
        } catch (Exception e) {
            MonitorUtils.incCountForException(invocation.getMethod().getDeclaringClass().getName(), invocation.getMethod().getName());
            log.error("Dao Occur Exception : ", e);
            throw e;
        } finally {
            long endTime = System.currentTimeMillis();
            long timeCost = endTime - startTime;
            MonitorUtils.incTimeForDao(invocation.getMethod().getDeclaringClass().getName(), invocation.getMethod().getName(), timeCost);
        }
    }
}
