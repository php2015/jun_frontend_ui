package org.zyl.ms.modules.system.param.request;

import org.zyl.support.annotation.constraints.Constraints;
import org.zyl.support.annotation.constraints.ConstraintsString;

/**
 * 角色 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRoleCreateParameter {
	/**
	 * 角色名
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String roleName;
	/**
	 * 角色权限说明
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
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