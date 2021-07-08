package com.chensi.socket.model;

/**
 * layim基础用户信息
 * @author chensi
 * @version 2016-8-24 下午3:08:20
 */
public class BaseUser {

	/** 用户id */
	private Integer id;
	/** 用户名 */
	private String username;
	/** 姓名 */
	private String name;
	/** 用户头像 */
	private String avatar;
	/** 用户签名 */
	private String sign;
	/** 用户状态：online、hide */
	private String status;

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

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
