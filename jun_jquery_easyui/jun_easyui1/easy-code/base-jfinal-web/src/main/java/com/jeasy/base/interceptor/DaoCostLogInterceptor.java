package com.jeasy.base.interceptor;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.jeasy.date.DateExUtils;
import com.jeasy.json.GsonUtils;
import com.jeasy.util.MonitorUtils;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

/**
 * Dao层日志拦截器
 * @author taomk
 * @version 1.0
 * @since 2015/12/16 17:42
 */
@Slf4j
public class DaoCostLogInterceptor implements Interceptor {

    @Override
    public void intercept(Invocation inv) {
        String className = inv.getTarget().getClass().getName();
        String methodName = inv.getMethodName();
        Object[] args = inv.getArgs();

        StringBuilder logMsg = new StringBuilder("\nDao execute report -------- " + DateExUtils.currentDatetime() + " ---------------------------------------------------------");
        logMsg.append("\nDao   : ").append(className);
        logMsg.append("\nMethod    : ").append(methodName);
        logMsg.append("\nParameter : ").append(Joiner.on(",").join(Lists.transform(Arrays.asList(args), new Function<Object, String>() {
            @Override
            public String apply(Object input) {
                return GsonUtils.toJson(input);
            }
        })));

        long startTime = System.currentTimeMillis();
        try {
            inv.invoke();
            MonitorUtils.incTimeForDao(className, methodName, System.currentTimeMillis() - startTime);

            logMsg.append("\nResult    : ").append(GsonUtils.toJson(inv.getReturnValue()));
            logMsg.append("\nCost Time : ").append(System.currentTimeMillis() - startTime).append(" ms");
            logMsg.append("\n---------------------------------------------------------------------------------------------------------");
            log.info(logMsg.toString());
        } catch (Throwable e) {
            MonitorUtils.incCountForException(className, methodName);
            log.error(className + "." + methodName + " Occur Exception : ", e);
            throw e;
        }
    }
}
