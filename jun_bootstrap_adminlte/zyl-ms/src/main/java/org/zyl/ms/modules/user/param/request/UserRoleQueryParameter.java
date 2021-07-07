package org.zyl.ms.modules.user.param.request;

import org.zyl.support.request.BaseQueryParameter;

/**
 * 用户角色关联 查询参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserRoleQueryParameter extends BaseQueryParameter {
	private long id;
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

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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