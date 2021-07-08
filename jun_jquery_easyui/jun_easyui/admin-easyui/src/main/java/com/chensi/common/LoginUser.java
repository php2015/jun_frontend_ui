package com.chensi.common;
/**
 * 用于放到session的当前登录的用户
 * @author chensi
 * @version 2016-8-23 下午5:43:39
 */
public class LoginUser {

	/**用户id*/
	private Integer id;
	/**用户名*/
	private String username;
	/**角色id*/
	private Integer roleId;
	/**姓名*/
	private String name;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
