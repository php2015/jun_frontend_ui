package com.ssm.shiro;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssm.common.util.Digests;
import com.ssm.common.util.Encodes;
import com.ssm.entity.DataControl;
import com.ssm.entity.OrganizationRole;
import com.ssm.entity.Permission;
import com.ssm.entity.Role;
import com.ssm.entity.RolePermission;
import com.ssm.entity.RolePermissionDataControl;
import com.ssm.entity.User;
import com.ssm.entity.UserRole;
import com.ssm.service.OrganizationRoleService;
import com.ssm.service.RoleService;
import com.ssm.service.UserRoleService;
import com.ssm.service.UserService;

/** 
 * @description: 
 * @version 1.0
 * @author Kool Zhao
 * @createDate 2014-1-13;下午11:04:03
 */
public class ShiroDbRealm extends AuthorizingRealm {

	private static final Logger log = LoggerFactory.getLogger(ShiroDbRealm.class);
	
	private static final int INTERATIONS = 1024;
	private static final int SALT_SIZE = 8;
	private static final String ALGORITHM = "SHA-1";

	// 是否启用超级管理员
	protected boolean activeRoot = false;
	
	// 是否使用验证码
	protected boolean useCaptcha = false;
	
	protected UserService userService;
	
	protected RoleService roleService;
	
	protected UserRoleService userRoleService;
	
	protected OrganizationRoleService organizationRoleService;
	
	
	/**
	 * 给ShiroDbRealm提供编码信息，用于密码密码比对
	 * 描述
	 */	
	public ShiroDbRealm() {
		super();
		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(ALGORITHM);
		matcher.setHashIterations(INTERATIONS);

		setCredentialsMatcher(matcher);
	}
	
	/**
	 * 认证回调函数, 登录时调用.
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		if (useCaptcha) {
			CaptchaUsernamePasswordToken token = (CaptchaUsernamePasswordToken) authcToken;
			try {
				if (!doCaptchaValidate(token)) {//忽略大小写。
					throw new IncorrectCaptchaException("验证码错误！");
				}
			} catch (Exception e) {
				// session如果没有刷新，validateResponseForID会抛出com.octo.captcha.service.CaptchaServiceException的异常
				throw new IncorrectCaptchaException("验证码错误！");
			}
		} 
		
		UsernamePasswordToken token = (UsernamePasswordToken)authcToken;
		User user = userService.get(token.getUsername());
		if (user != null) {
			if (user.getStatus().equals("disabled")) {
				throw new DisabledAccountException();
			}
			
			byte[] salt = Encodes.decodeHex(user.getSalt());
			
			ShiroUser shiroUser = new ShiroUser(user.getId(), user.getUsername(), user);
			// 这里可以缓存认证
			return new SimpleAuthenticationInfo(shiroUser, user.getPassword(),
					ByteSource.Util.bytes(salt), getName());
		} else {
			return null;
		}
	}
	
	//验证码校验
	protected boolean doCaptchaValidate(CaptchaUsernamePasswordToken token){
		String captcha = (String) SecurityUtils.getSubject().getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		if (captcha != null &&!captcha.equalsIgnoreCase(token.getCaptcha())){
			return false;
		}
		return true;
	}
	
	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		Collection<?> collection = principals.fromRealm(getName());
		if (collection == null || collection.isEmpty()) {
			return null;
		}
		ShiroUser shiroUser = (ShiroUser) collection.iterator().next();
		
		// 设置、更新User
		shiroUser.setUser(userService.get(shiroUser.getId()));
		return newAuthorizationInfo(shiroUser);
	}

	private SimpleAuthorizationInfo newAuthorizationInfo(ShiroUser shiroUser) {
		Collection<String> hasPermissions = null;
		Collection<String> hasRoles = null;
		
		// 是否启用超级管理员 && id==1为超级管理员，构造所有权限 
		if (activeRoot && shiroUser.getId() == 1) {
			hasRoles = new HashSet<String>();
			List<Role> roles = roleService.findAll();
			for (Role role : roles) {
				hasRoles.add(role.getName());
			}
			
			hasPermissions = new HashSet<String>();
			hasPermissions.add("*");
			
			if (log.isInfoEnabled()) {
				log.info("使用了" + shiroUser.getLoginName() + "的超级管理员权限:" + "。At " + new Date());
				log.info(shiroUser.getLoginName() + "拥有的角色:" + hasRoles);
				log.info(shiroUser.getLoginName() + "拥有的权限:" + hasPermissions);
			}
		} else {
			List<UserRole> userRoles = userRoleService.find(shiroUser.getId());
			List<OrganizationRole> organizationRoles = new ArrayList<OrganizationRole>();
			if(shiroUser.getUser().getOrganization() != null){
				 organizationRoles = organizationRoleService.find(shiroUser.getUser().getOrganization().getId());
			}
			
			Collection<Role> roles = getUserRoles(userRoles, organizationRoles);
			hasRoles = makeRoles(roles, shiroUser);
			hasPermissions = makePermissions(roles, shiroUser);
		}
		
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		info.addRoles(hasRoles);
		info.addStringPermissions(hasPermissions);
		
		return info;
	}
	
	private Collection<Role> getUserRoles(List<UserRole> userRoles, List<OrganizationRole> organizationRoles) {
		Set<Role> roles = new HashSet<Role>();
		for (UserRole userRole : userRoles) {
			roles.add(userRole.getRole());
		}
		
		for (OrganizationRole organizationRole : organizationRoles) {
			roles.add(organizationRole.getRole());
		}
		
		return roles;
	}
	
	/**
	 * 组装角色权限
	 * @param roles
	 * @param shiroUser
	 * @return
	 */
	private Collection<String> makeRoles(Collection<Role> roles, ShiroUser shiroUser) {
		Collection<String> hasRoles = new HashSet<String>();
		for (Role role : roles) {
			hasRoles.add(role.getName());
		}

		if (log.isInfoEnabled()) {
			log.info(shiroUser.getLoginName() + "拥有的角色:" + hasRoles);
		}
		return hasRoles;
	}
	
	/**
	 * 组装资源操作权限
	 * @param roles
	 * @param shiroUser
	 * @return
	 */
	private Collection<String> makePermissions(Collection<Role> roles, ShiroUser shiroUser) {
		// 清空shiroUser中map
		shiroUser.getHasDataControls().clear();
		shiroUser.getHasModules().clear();
		
		Collection<String> stringPermissions = new ArrayList<String>();
		for (Role role : roles) {
			List<RolePermission> rolePermissions = role.getRolePermissions();
			for (RolePermission rolePermission : rolePermissions) {
				Permission permission = rolePermission.getPermission();
				
				String resource = permission.getModule().getSn();
				String operate = permission.getShortName();
		
				StringBuilder builder = new StringBuilder();
				builder.append(resource + ":" + operate);
				
				shiroUser.getHasModules().put(resource, permission.getModule());
				
				StringBuilder dcBuilder = new StringBuilder();
				for (RolePermissionDataControl rpdc : rolePermission.getRolePermissionDataControls()) {
					DataControl dataControl = rpdc.getDataControl();
					dcBuilder.append(dataControl.getName() + ",");
					
					shiroUser.getHasDataControls().put(dataControl.getName(), dataControl);
				}
				
				if (dcBuilder.length() > 0) {
					builder.append(":" + dcBuilder.substring(0, dcBuilder.length() - 1));
				}
				
				stringPermissions.add(builder.toString());
			}
		}

		if (log.isInfoEnabled()) {
			log.info(shiroUser.getLoginName() + "拥有的权限:" + stringPermissions);
		}
		return stringPermissions;
	}
	
	public static class HashPassword {
		public String salt;
		public String password;
	}
	
	public static HashPassword encryptPassword(String plainPassword) {
		HashPassword result = new HashPassword();
		byte[] salt = Digests.generateSalt(SALT_SIZE);
		result.salt = Encodes.encodeHex(salt);

		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), salt, INTERATIONS);
		result.password = Encodes.encodeHex(hashPassword);
		return result;
	}
	
	/**
	 * 
	 * 验证密码
	 * @param plainPassword 明文密码
	 * @param password 密文密码
	 * @param salt 盐值
	 * @return
	 */
	public static boolean validatePassword(String plainPassword, String password, String salt) {
		byte[] hashPassword = Digests.sha1(plainPassword.getBytes(), Encodes.decodeHex(salt), INTERATIONS);
		String oldPassword = Encodes.encodeHex(hashPassword);
		return password.equals(oldPassword);
	}

	/**
	 * 更新用户授权信息缓存.
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
	
	public boolean isUseCaptcha() {
		return useCaptcha;
	}

	public void setUseCaptcha(boolean useCaptcha) {
		this.useCaptcha = useCaptcha;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public UserRoleService getUserRoleService() {
		return userRoleService;
	}

	public void setUserRoleService(UserRoleService userRoleService) {
		this.userRoleService = userRoleService;
	}

	public OrganizationRoleService getOrganizationRoleService() {
		return organizationRoleService;
	}

	public void setOrganizationRoleService(
			OrganizationRoleService organizationRoleService) {
		this.organizationRoleService = organizationRoleService;
	}

	public boolean isActiveRoot() {
		return activeRoot;
	}

	public void setActiveRoot(boolean activeRoot) {
		this.activeRoot = activeRoot;
	}

	public RoleService getRoleService() {
		return roleService;
	}

	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}
	
}
