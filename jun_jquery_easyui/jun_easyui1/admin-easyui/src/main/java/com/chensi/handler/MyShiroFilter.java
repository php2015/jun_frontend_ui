package com.chensi.handler;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;

import com.chensi.common.Constants;
import com.chensi.common.LoginUser;
import com.chensi.model.User;
import com.chensi.service.IUserService;

/**
 * 记住用户，会话被销毁后复原session相关信息
 * isAccessAllowed：表示是否允许访问；mappedValue就是[urls]配置中拦截器参数部分，如果允许访问返回true，否则false；
 * onAccessDenied
 * ：表示当访问拒绝时是否已经处理了；如果返回true表示需要继续处理；如果返回false表示该拦截器实例已经处理了，将直接返回即可。
 * @author chensi
 * @version 2016-8-12 上午10:49:52
 */
public class MyShiroFilter extends FormAuthenticationFilter {

	@Autowired
	private IUserService userService;

	@Autowired
	private SessionDAO sessionDAO;

	/**
	 * 是否允许访问
	 */
	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		Subject subject = getSubject(request, response);
		// 如果 isAuthenticated 为 false 证明不是登录过的，同时 isRememberd 为true,
		// 证明是没登录直接通过记住我功能进来的
		if (!subject.isAuthenticated() && subject.isRemembered()) {
			Session curSession = subject.getSession();
			if (curSession.getAttribute(Constants.LOGIN_USER) == null) {
				String username = subject.getPrincipal().toString();
				Collection<Session> sessions = sessionDAO.getActiveSessions();
				for (Session s : sessions) {
					// 清除PRINCIPAL相同且不是当前登录的session
					if (s.getId() != curSession.getId()
							&& StringUtils.equals(username, String.valueOf(s.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY)))) {
						// s.setTimeout(0);
						s.stop();
					}
				}
				User param = new User();
				param.setUsername(username);
				User user = userService.getByEntity(param);// 保证用户名唯一
				LoginUser loginUser = new LoginUser();
				loginUser.setId(user.getId());
				loginUser.setUsername(user.getUsername());
				loginUser.setRoleId(user.getRoleId());
				loginUser.setName(user.getName());
				// TODO 此处省略了校验用户信息（密码，状态），一旦密码和状态变了这边要做处理
				curSession.setAttribute(Constants.LOGIN_USER, loginUser);
				// 加载菜单放到index.html处理
			}
		}
		// authc级别或者user级别通过
		return subject.isAuthenticated() || subject.isRemembered();
	}

	/**
	 * 处理拒绝访问的回调: 如果没有配置，shiro默认是按照配置的loginUrl返回到登录页
	 * 但是如果是ajax请求我们需要回调给予提示，方法：传送401的http错误码给ajax请求捕捉处理
	 */
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		Subject subject = getSubject(request, response);
		String uri = httpServletRequest.getRequestURI();
		// 会话为空的ajax请求给予提示返回登录页面
		if (subject.getPrincipal() == null && StringUtils.endsWith(uri, ".do")) {
			try {
				// 401错误：该错误消息表明您首先需要登录
				httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return false;
		}
		return super.onAccessDenied(request, response);
	}

}
