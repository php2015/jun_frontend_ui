package org.zyl.ms.modules.user.entity;

import org.zyl.support.entity.Entity;

/**
 * 用户角色关联
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserRole extends Entity {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 
	 */
	private int userId;
	/**
	 * 
	 */
	private int roleId;
	/**
	 * 
	 */
	private String roleName;

	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}