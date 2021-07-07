package com.jeasy.base.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.lang.reflect.UndeclaredThrowableException;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.jeasy.base.controller.ModelResult;
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
public class ControllerCostLogInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		ThreadLocalUtils.putTime(System.currentTimeMillis());
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		long endTime = System.currentTimeMillis();
		long beginTime = ThreadLocalUtils.getTime();
		long consumeTime = endTime - beginTime;

		MonitorUtils.incTimeForController(((HandlerMethod) handler).getBeanType().getName(), ((HandlerMethod) handler).getMethod().getName(), consumeTime);

		StringBuilder logMsg = new StringBuilder("\nController execute report -------- " + DateExUtils.currentDatetime() + " -------------------------------------");
		logMsg.append("\nURI         : ").append(request.getRequestURI()).append(", Method : ").append(request.getMethod());

		if (handler instanceof HandlerMethod) {
			logMsg.append("\nController  : ").append(((HandlerMethod) handler).getBeanType().getName()).append(", Method : ").append(((HandlerMethod) handler).getMethod().getName());
		}

		if (request.getMethod().equalsIgnoreCase("GET")) {
			logMsg.append("\nQueryString : ").append(DecodeUtils.decodeURLComponent(StringUtils.isBlank(request.getQueryString()) ? "" : request.getQueryString()));
		} else if (request.getMethod().equalsIgnoreCase("POST")) {
			logMsg.append("\nParameter   : ").append(GsonUtils.toJson(request.getParameterMap()));
		}

		ModelResult result = (ModelResult)request.getAttribute("result");
		if (ex != null) {

			MonitorUtils.incCountForException(((HandlerMethod) handler).getBeanType().getName(), ((HandlerMethod) handler).getMethod().getName());

			if (result == null) {
				result = new ModelResult(ModelResult.CODE_500);
			} else {
				result.setCode(ModelResult.CODE_500);
			}

			if(ex instanceof IllegalArgumentException) {
				result.setCode(400);
				result.setMessage(ex.getMessage());
			} else if(ex instanceof UndeclaredThrowableException) {
				result.setMessage(((UndeclaredThrowableException) ex).getUndeclaredThrowable().getMessage());
			} else {
				result.setMessage(ex.getMessage());
			}
		}

		logMsg.append("\nResponse    : ").append(GsonUtils.toJson(result));
		logMsg.append("\nCost Time   : ").append(consumeTime).append(" ms");
		logMsg.append("\n--------------------------------------------------------------------------------------------");
		log.info(logMsg.toString());

		if (ex != null && handler instanceof HandlerMethod) {
			log.error(((HandlerMethod) handler).getBeanType().getName() + " Occur Exception : ", ex);
		}

		if (response.getContentType() == null || !response.getContentType().equalsIgnoreCase("application/octet-stream")) {
			PrintWriter out = null;
			try {
				response.setContentType("application/json;charset=utf-8");
				out = response.getWriter();
				out.append(GsonUtils.toJson(result));
			} catch (Exception e) {
				log.error(this.getClass().getSimpleName() + " Occur Exception : ", e);
			} finally {
				try {
					if (out != null) {
						out.flush();
						response.flushBuffer();
						out.close();
					}
				} catch (Exception e) {
					log.error("Response Flush Or Close Occur Exception : ", e);
				} finally {
					ThreadLocalUtils.removeTime();
				}
			}
		}
	}
}
