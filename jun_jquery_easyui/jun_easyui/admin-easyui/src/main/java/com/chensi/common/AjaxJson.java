package com.chensi.common;

/**
 * ajax请求返回的json对象
 * @author Chason
 * @version 2016-5-29 下午9:44:20
 */
public class AjaxJson {

	/** 返回状态码 */
	private String status;
	/** 返回数据 */
	private Object data;
	/** 返回提示 */
	private String message;

	public static AjaxJson getSuccessInfo() {
		return new AjaxJson(Constants.AJAX_SUCCESS, "", "成功");
	}

	public static AjaxJson getSuccessInfo(Object data) {
		return new AjaxJson(Constants.AJAX_SUCCESS, data, "成功");
	}

	public static AjaxJson getFailInfo() {
		return new AjaxJson(Constants.AJAX_FAIL, "", "服务器忙，请稍后再试...");
	}

	public static AjaxJson getFailInfo(String message) {
		return new AjaxJson(Constants.AJAX_FAIL, "", message);
	}

	public static AjaxJson getWarnInfo(String message) {
		return new AjaxJson(Constants.AJAX_WARN, "", message);
	}

	public static AjaxJson getWarnInfo(Object data, String message) {
		return new AjaxJson(Constants.AJAX_WARN, data, message);
	}

	public static AjaxJson getNoAuth() {
		return new AjaxJson(Constants.AJAX_NO_AUTH, "", Constants.NO_AUTH);
	}

	public static AjaxJson getNoAuth(String message) {
		return new AjaxJson(Constants.AJAX_NO_AUTH, "", message);
	}

	public static AjaxJson getRedirectInfo() {
		return new AjaxJson(Constants.AJAX_REDIRECT, "/login.html", "重定向到登录页面");
	}

	public static AjaxJson getRedirectInfo(Object data) {
		// data格式类似 ：/user/login.do
		return new AjaxJson(Constants.AJAX_REDIRECT, data, "重定向到指定页面");
	}

	public AjaxJson(String status) {
		super();
		this.status = status;
	}

	public AjaxJson(String status, Object data) {
		super();
		this.status = status;
		this.data = data;
	}

	public AjaxJson(String status, Object data, String message) {
		super();
		this.status = status;
		this.data = data;
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
