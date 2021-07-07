package cn.javabb.common.realm;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import cn.javabb.common.constant.Constant;
import cn.javabb.common.util.BUtil;
import cn.javabb.sys.entity.User;
import cn.javabb.sys.service.UserService;

public class MyRealm extends AuthorizingRealm{

	@Autowired
	private UserService userService;
	/**
	 * 授权调用函数
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		return null;
	}
	/**
	 * 认证回调函数，登陆时候调用
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
	        String username =  (String)authenticationToken.getPrincipal();
	        User u = new User();
	        u.setUserName(username);
	        User user = userService.queryOne(u);
	        if(BUtil.isNull(user)){
	        	throw new UnknownAccountException("账号或密码不正确");
	        }
	        if(user.getState()==1){
	        	throw new LockedAccountException("账号已被锁定,请联系管理员");
	        }
        	SecurityUtils.getSubject().getSession().setAttribute(Constant.SESSION_USER, user); // 将当前用户存入session
			AuthenticationInfo authcInfo=new SimpleAuthenticationInfo(user.getUserName(), user.getUserPwd(),Constant.MD5_SALT);
			return authcInfo;
	}

}
