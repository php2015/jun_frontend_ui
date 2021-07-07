package org.zyl.ms.modules.system.param.request;

/**
 * 角色 修改参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRoleUpdateParameter {
	private long id;
	/**
	 * 角色名
	 */
	private String roleName;
	/**
	 * 角色权限说明
	 */
	private String roleDesc;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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