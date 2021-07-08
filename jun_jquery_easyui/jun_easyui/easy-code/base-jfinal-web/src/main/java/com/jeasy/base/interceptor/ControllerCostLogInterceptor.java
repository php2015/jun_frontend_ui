package com.jeasy.base.interceptor;

import com.jeasy.base.controller.ControllerSupport;
import com.jeasy.base.controller.ModelResult;
import com.jeasy.date.DateExUtils;
import com.jeasy.http.DecodeUtils;
import com.jeasy.json.GsonUtils;
import com.jeasy.util.MonitorUtils;
import com.jeasy.util.ThreadLocalUtils;
import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.render.JsonRender;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.lang.reflect.UndeclaredThrowableException;

/**
 * Controller层日志拦截器
 *
 * @author taomk
 * @version 1.0
 * @since 15-5-22 下午7:57
 */
@Slf4j
public class ControllerCostLogInterceptor extends ControllerSupport implements Interceptor {

    @Override
    public void intercept(Invocation inv) {
        ThreadLocalUtils.putTime(System.currentTimeMillis());

        StringBuilder logMsg = new StringBuilder("\nController execute report -------- " + DateExUtils.currentDatetime() + " -------------------------------------");
        logMsg.append("\nURI         : ").append(inv.getController().getRequest().getRequestURI()).append(", Method : ").append(inv.getController().getRequest().getMethod());
        logMsg.append("\nController  : ").append(inv.getController().getClass().getName()).append(", Method : ").append(inv.getMethodName());

        if (inv.getController().getRequest().getMethod().equalsIgnoreCase("GET")) {
            logMsg.append("\nQueryString : ").append(DecodeUtils.decodeURLComponent(StringUtils.isBlank(inv.getController().getRequest().getQueryString()) ? "" : inv.getController().getRequest().getQueryString()));
        } else if (inv.getController().getRequest().getMethod().equalsIgnoreCase("POST")) {
            logMsg.append("\nParameter   : ").append(GsonUtils.toJson(inv.getController().getRequest().getParameterMap()));
        }

        ModelResult result;
        try {
            inv.invoke();

            MonitorUtils.incTimeForController(inv.getController().getClass().getName(), inv.getMethodName(), System.currentTimeMillis() - ThreadLocalUtils.getTime());
            result = (ModelResult) inv.getController().getRequest().getAttribute("result");

        } catch (Exception ex) {
            MonitorUtils.incCountForException(inv.getController().getClass().getName(), inv.getMethodName());

            result = new ModelResult(ModelResult.CODE_500);
            if (ex instanceof IllegalArgumentException) {
                result.setCode(400);
                result.setMessage(ex.getMessage());
            } else if (ex instanceof UndeclaredThrowableException) {
                result.setMessage(((UndeclaredThrowableException) ex).getUndeclaredThrowable().getMessage());
            } else {
                result.setMessage(ex.getMessage());
            }
        }

        logMsg.append("\nResponse    : ").append(GsonUtils.toJson(result));
        logMsg.append("\nCost Time   : ").append(System.currentTimeMillis() - ThreadLocalUtils.getTime()).append(" ms");
        logMsg.append("\n--------------------------------------------------------------------------------------------");
        log.info(logMsg.toString());

        new JsonRender(GsonUtils.toJson(result)).setContext(inv.getController().getRequest(), inv.getController().getResponse()).render();
    }
}
