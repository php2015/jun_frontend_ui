package com.chensi.socket.model;

/**
 * 群组
 * @author chensi
 * @version 2016-8-31 下午4:16:43
 */
public class Group {

	/** 群id */
	private Integer id;
	/** 群名 */
	private String groupname;
	/** 群头像 */
	private String avatar;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGroupname() {
		return groupname;
	}

	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

}
