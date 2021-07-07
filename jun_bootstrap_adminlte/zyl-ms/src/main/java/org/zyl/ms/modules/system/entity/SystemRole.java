package org.zyl.ms.modules.system.entity;

import org.zyl.support.entity.Entity;

/**
 * 角色
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRole extends Entity {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 角色名
	 */
	private String roleName;
	/**
	 * 角色权限说明
	 */
	private String roleDesc;

	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleDesc() {
		return roleDesc;
	}
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}
}