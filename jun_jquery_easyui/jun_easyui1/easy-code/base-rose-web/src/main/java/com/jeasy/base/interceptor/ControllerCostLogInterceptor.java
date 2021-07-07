package com.jeasy.base.interceptor;

import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.InvocationChain;
import net.paoding.rose.web.annotation.Interceptor;

import org.apache.commons.lang.StringUtils;

import com.jeasy.base.controllers.ModelResult;
import com.jeasy.date.DateExUtils;
import com.jeasy.doc.util.MonitorUtils;
import com.jeasy.http.DecodeUtils;
import com.jeasy.json.GsonUtils;
import com.jeasy.util.ThreadLocalUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * Controller层日志拦截器
 * @author taomk
 * @version 1.0
 * @since 15-5-22 下午7:57
 */
@Slf4j
@Interceptor(oncePerRequest = true)
public class ControllerCostLogInterceptor extends ControllerInterceptorAdapter {

	@Override
	protected Object before(Invocation inv) throws Exception {
		ThreadLocalUtils.putTime(System.currentTimeMillis());
		return true;
	}

	@Override
	protected Object round(Invocation inv, InvocationChain chain) throws Exception {
		try {
			return super.round(inv, chain);
		} catch (Exception e) {
			MonitorUtils.incCountForException(inv.getControllerClass().getName(), inv.getMethod().getName());
			log.error("Occur Exception : ", e);
			throw e;
		}
	}

	@Override
	protected Object after(Invocation inv, Object instruction) throws Exception {
		long endTime = System.currentTimeMillis();
		long beginTime = ThreadLocalUtils.getTime();
		long consumeTime = endTime - beginTime;

		MonitorUtils.incTimeForController(inv.getControllerClass().getName(), inv.getMethod().getName(), consumeTime);

		StringBuilder logMsg = new StringBuilder("\nController execute report -------- " + DateExUtils.currentDatetime() + " --------------------------------------------------");
		logMsg.append("\nURI         : ").append(inv.getRequest().getRequestURI()).append(", Method : ").append(inv.getRequest().getMethod());
		logMsg.append("\nController  : ").append(inv.getControllerClass().getName()).append(", Method : ").append(inv.getMethod().getName());

		if (inv.getRequest().getMethod().equalsIgnoreCase("GET")) {
			logMsg.append("\nQueryString : ").append(DecodeUtils.decodeURLComponent(StringUtils.isBlank(inv.getRequest().getQueryString()) ? "" : inv.getRequest().getQueryString()));
		} else if (inv.getRequest().getMethod().equalsIgnoreCase("POST")) {
			logMsg.append("\nParameter   : ").append(GsonUtils.toJson(inv.getRequest().getParameterMap()));
		}

		ModelResult result = (ModelResult)inv.getRequest().getAttribute("result");
		logMsg.append("\nResponse    : ").append(GsonUtils.toJson(result));
		logMsg.append("\nCost Time   : ").append(consumeTime).append(" ms");
		logMsg.append("\n---------------------------------------------------------------------------------------------------------");
		log.info(logMsg.toString());
		return instruction;
	}
}
