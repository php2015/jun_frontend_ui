package com.chensi.model;

import java.io.Serializable;
/**
 * 角色菜单表：t_role_menu
 * @author chensi
 * @version 2016-8-5 下午10:52:07
 */
@SuppressWarnings("serial")
public class RoleMenu implements Serializable{

	private Integer id;
	/**角色id*/
	private Integer roleId;
	/**菜单id*/
	private Integer menuId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}
	
	
}
