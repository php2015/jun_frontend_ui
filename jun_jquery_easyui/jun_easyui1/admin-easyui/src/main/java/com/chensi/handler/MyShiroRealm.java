package com.chensi.handler;

import java.util.Collection;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.chensi.common.Constants;
import com.chensi.common.LoginUser;
import com.chensi.model.User;
import com.chensi.service.IRoleService;
import com.chensi.service.IUserService;

/**
 * 用户授权域
 * @author chensi
 * @version 2016-8-11 下午6:04:05
 */
public class MyShiroRealm extends AuthorizingRealm {

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	@Autowired
	private SessionDAO sessionDAO;

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String username = (String) principals.getPrimaryPrincipal();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		User param = new User();
		param.setUsername(username);
		User user = userService.getByEntity(param);
		// 授权限
		if(user!=null&&user.getIsSuper()==Constants.USER_SUPER_Y){
			Set<String> urls = roleService.listAllMenuCode();
			info.addStringPermissions(urls);
		}else{
			Set<String> urls = roleService.listMyMenuCode(user.getRoleId());
			info.addStringPermissions(urls);
		}
		// 授角色
		// Set<String> roles=new HashSet<String>();
		// roles.add("user");
		// info.addRoles(roles);
		return info;
	}

	/**
	 * 认证回调函数,登录时调用.
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
		Subject subject = SecurityUtils.getSubject();
		Session curSession = subject.getSession();
		UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
		String username = token.getUsername();
		// 在线会话管理，踢出当前用户名已经登录的session（不包含当前sessionid:可以防止一个session登录后退重复登录）
		Collection<Session> sessions = sessionDAO.getActiveSessions();
		for (Session session : sessions) {
			if (curSession.getId() != session.getId()
					&& StringUtils.equals(username, String.valueOf(session.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY)))) {
				// session.setTimeout(0);
				session.stop();// 另一种方式
			}
		}
		User param = new User();
		param.setUsername(token.getUsername());
		User user = userService.getByEntity(param);
		if (user != null) {
			// 存放session
			LoginUser loginUser = new LoginUser();
			loginUser.setId(user.getId());
			loginUser.setUsername(user.getUsername());
			loginUser.setRoleId(user.getRoleId());
			loginUser.setName(user.getName());
			curSession.setAttribute(Constants.LOGIN_USER, loginUser);
			// 交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配
			return new SimpleAuthenticationInfo(user.getUsername(), user.getPassword()/**
			 * 
			 * 
			 * ,ByteSource.Util.bytes(user.getCredentialsSalt())
			 */
			, getName());
		} else {
			throw new UnknownAccountException();
		}
	}

	/**
	 * 更新用户授权信息缓存
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
		clearCachedAuthorizationInfo(principals);
	}

	/**
	 * 清除所有用户授权信息缓存.
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			for (Object key : cache.keys()) {
				cache.remove(key);
			}
		}
	}

}
