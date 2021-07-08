package com.chensi.socket.model;

import java.util.Map;

/**
 * Layim聊天上传返回json
 * @author chensi
 * @version 2016-8-24 上午10:12:10
 */
public class AjaxSocket {

	/** 状态码 */
	private Integer code;
	/** 提示 */
	private String msg;
	/** 数据 */
	private Map<String, Object> data;

	public static AjaxSocket getFailInfo() {
		return new AjaxSocket(1, "服务器忙，请稍后", null);
	}

	public static AjaxSocket getSuccessInfo(Map<String, Object> data) {
		return new AjaxSocket(0, "成功", data);
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public AjaxSocket() {
		super();
	}

	public AjaxSocket(Integer code, String msg, Map<String, Object> data) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

}
