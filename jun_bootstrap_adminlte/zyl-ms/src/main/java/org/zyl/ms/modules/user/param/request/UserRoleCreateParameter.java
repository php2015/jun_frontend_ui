package org.zyl.ms.modules.user.param.request;

import org.zyl.support.annotation.constraints.Constraints;
import org.zyl.support.annotation.constraints.ConstraintsString;

/**
 * 用户角色关联 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserRoleCreateParameter {
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
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
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