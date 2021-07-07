package org.zyl.ms.modules.user.param.response;

import java.util.ArrayList;
import java.util.List;

import org.zyl.ms.modules.system.param.response.SystemMenuQueryData;

/**
 * 用户角色关联 查询结果封装
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserRoleQueryData{
	private long id;
	/**
	 * 用户id
	 */
	private int userId;
	/**
	 * 角色id
	 */
	private int roleId;
	/**
	 * 角色名
	 */
	private String roleName;
	/**
	 * 菜单
	 */
	private List<SystemMenuQueryData> menus = new ArrayList<SystemMenuQueryData>();
	
	public List<SystemMenuQueryData> getMenus() {
		return menus;
	}
	public void setMenus(List<SystemMenuQueryData> menus) {
		this.menus = menus;
	}
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