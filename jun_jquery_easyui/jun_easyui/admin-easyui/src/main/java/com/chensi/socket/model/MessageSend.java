package com.chensi.socket.model;

/**
 * 页面传来的信息
 * @author chensi
 * @version 2016-8-22 下午10:37:39
 */
public class MessageSend {

	/** 消息类型：eg：聊天信息、消息推送 */
	private String type;
	/** 消息体 */
	private String data;
	/** 来源者 */
	private Mine mine;
	/** 目标者 */
	private To to;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Mine getMine() {
		return mine;
	}

	public void setMine(Mine mine) {
		this.mine = mine;
	}

	public To getTo() {
		return to;
	}

	public void setTo(To to) {
		this.to = to;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

}
