package com.chensi.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import com.chensi.common.AjaxJson;
import com.chensi.common.Constants;
import com.chensi.common.Global;

/**
 * 全局异常处理类
 * @author Chason
 * @version 2016-5-29 下午7:36:43
 */
public class MyExceptionHandler extends SimpleMappingExceptionResolver {

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) {
		// TODO uploadify有时会触发这个异常，待解决
		if (exception instanceof java.io.IOException) {
			return new ModelAndView();
		}
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		ResponseBody body = handlerMethod.getMethodAnnotation(ResponseBody.class);
		if (body == null) {
			if (exception instanceof org.apache.shiro.authz.AuthorizationException) {
				return new ModelAndView("redirect:/page/noAuth.jsp");
			}
			logger.error("************全局异常处理器捕捉到异常: " + exception.toString());
			return new ModelAndView("redirect:/page/404.jsp");
		}
		// 设置状态码,注意这里不能设置成500，设成500JQuery不会出错误提示
		// 并且不会有任何反应
		response.setStatus(HttpStatus.OK.value());
		// 设置ContentType
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		// 避免乱码
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Cache-Control", "no-cache, must-revalidate");
		try {
			StringWriter sw = new StringWriter();
			exception.printStackTrace(new PrintWriter(sw, true));
			PrintWriter writer = response.getWriter();
			if (exception instanceof org.apache.shiro.authz.AuthorizationException) {
				writer.write(Global.gson.toJson(AjaxJson.getFailInfo(Constants.NO_AUTH)));
			} else {
				logger.error("************全局异常处理器捕捉到异常:" + sw.toString());
				writer.write(Global.gson.toJson(AjaxJson.getFailInfo()));
			}
			writer.close();
		} catch (IOException e) {
			logger.error("************输出json出错" + "************");
			e.printStackTrace();
		}
		return new ModelAndView();
	}
}
