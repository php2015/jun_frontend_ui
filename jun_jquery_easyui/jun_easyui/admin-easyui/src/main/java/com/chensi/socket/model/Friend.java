package com.chensi.socket.model;

import java.util.List;

/**
 * Layim好友列表
 * @author chensi
 * @version 2016-8-24 下午6:02:08
 */
public class Friend {

	/** 分组id */
	private Integer id;
	/** 组名 */
	private String groupname;
	/** 在线数量 */
	private Integer online;
	/** 成员 */
	private List<?> list;

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

	public Integer getOnline() {
		return online;
	}

	public void setOnline(Integer online) {
		this.online = online;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

}
