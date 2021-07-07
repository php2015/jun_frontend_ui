package com.study.it.ui.interceptor;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;

public class LoginInterceptor implements HandlerInterceptor {
    private String userKey;
    private String loginRedirect;
    
	
	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}

	public void setLoginRedirect(String loginRedirect) {
		this.loginRedirect = loginRedirect;
	}

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		

	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest req, 
			HttpServletResponse resp, Object o) throws Exception {
		System.out.println("进入登录拦截器");
		HandlerMethod h=(HandlerMethod)o;
		Login an=h.getMethodAnnotation(Login.class);
		if(an==null)
			return true;
		
		if(req.getSession().getAttribute(this.userKey)==null)
		{
			 resp.sendRedirect(this.loginRedirect+"?msg="+URLEncoder.encode( an.value(),"UTF-8"));
		     return false; 
		}
	    return true;
		    	 
	}

}
