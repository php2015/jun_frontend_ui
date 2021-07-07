package com.chensi.util;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * web请求相关工具类
 * @author chensi
 * @version 2016-7-5 下午6:19:03
 */
public class WebUtil {

	/**
	 * 方法描述：获取请求URI, 忽略项目名称部分(如:/minicard/login.json返回/login.json)
	 * @param appPath
	 * @param request
	 * @return
	 */
	public static String getRequstURIIgnoreAppPath(String appPath, HttpServletRequest request) {
		String uri = request.getRequestURI();
		return uri.replace(appPath, "");
	}

	/**
	 * 发送重定向
	 * @param url
	 */
	public static void sendRedirect(String url) {
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
		try {
			response.sendRedirect(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 在Session中设置值
	 * @param name
	 * @param value
	 */
	public static void sessionVal(String name, Object value) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		session.setAttribute(name, value);
	}

	/**
	 * 获取session中的值
	 * @param name
	 * @return
	 */
	public static Object sessionVal(String name) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		return session.getAttribute(name);
	}

	/**
	 * 获取当前session
	 * @return
	 */
	public static HttpSession getSession() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		return session;
	}

}