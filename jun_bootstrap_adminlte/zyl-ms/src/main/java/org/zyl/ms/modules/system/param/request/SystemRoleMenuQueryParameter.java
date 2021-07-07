package org.zyl.ms.modules.system.param.request;

import org.zyl.support.request.BaseQueryParameter;

/**
 * 角色与菜单关联 查询参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRoleMenuQueryParameter extends BaseQueryParameter {
	private long id;
	/**
	 * 角色菜单ID
	 */
	private int roleId;
	/**
	 * 功能菜单ID
	 */
	private int menuId;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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