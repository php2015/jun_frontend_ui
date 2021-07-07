package org.zyl.ms.modules.system.entity;

import org.zyl.support.entity.Entity;

/**
 * 角色与菜单关联
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemRoleMenu extends Entity {
	private static final long serialVersionUID = 1L;
	
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