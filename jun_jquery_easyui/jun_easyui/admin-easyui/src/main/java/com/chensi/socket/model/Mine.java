package com.chensi.socket.model;

/**
 * 来源者信息
 * @author chensi
 * @version 2016-8-22 下午10:36:40
 */
public class Mine extends BaseUser {

	/** 是否我发送的消息 */
	private boolean mine;

	public boolean isMine() {
		return mine;
	}

	public void setMine(boolean mine) {
		this.mine = mine;
	}

}
