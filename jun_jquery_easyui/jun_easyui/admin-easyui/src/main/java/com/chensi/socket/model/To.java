package com.chensi.socket.model;

/**
 * 目标者信息
 * @author chensi
 * @version 2016-8-22 下午10:37:25
 */
public class To extends BaseUser {

	/** 聊天类型：好友聊天friend、群聊group */
	private String type;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
