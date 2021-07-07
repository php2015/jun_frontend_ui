package com.chensi.socket.model;

/**
 * 发给页面的信息
 * @author chensi
 * @version 2016-8-22 下午10:38:59
 */
public class MessageReceive {

	/** 消息类型：聊天信息、即时推送 */
	private String emit;
	/** 消息来源用户名 */
	private String username;
	/** 消息来源用户头像 */
	private String avatar;
	/** 聊天窗口来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id） */
	private Integer id;
	/** 聊天窗口来源类型：friend、group */
	private String type;
	/** 消息内容 */
	private Object content;
	/** 是否我发送的消息，如果为true，则会显示在右方 */
	private boolean mine;
	/** 服务端动态时间戳 */
	private Long timestamp;

	public String getEmit() {
		return emit;
	}

	public void setEmit(String emit) {
		this.emit = emit;
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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Object getContent() {
		return content;
	}

	public void setContent(Object content) {
		this.content = content;
	}

	public boolean isMine() {
		return mine;
	}

	public void setMine(boolean mine) {
		this.mine = mine;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

}
