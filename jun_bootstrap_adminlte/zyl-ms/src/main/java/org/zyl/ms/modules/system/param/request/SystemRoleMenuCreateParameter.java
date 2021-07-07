package org.zyl.ms.modules.system.param.request;

/**
 * 角色与菜单关联 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRoleMenuCreateParameter {
	/**
	 * 角色菜单ID
	 */
	private int roleId;
	/**
	 * 功能菜单ID
	 */
	private int menuId;

	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getMenuId() {
		return menuId;
	}
	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}
}