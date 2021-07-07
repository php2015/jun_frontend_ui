package cn.javabb.common.model;

import java.util.Date;

public class R {

	private int code; // 0为成功，1为失败
	private String msg;
	private Integer count;// 响应时间
	private Object data;// 响应内容

	public R() {
		super();
		// TODO Auto-generated constructor stub
	}
	public static R ok(int code, String msg) {
		R R = new R();
		R.setCode(code);
		R.setMsg(msg);
		return R;
	}

	public static R ok() {
		return ok(0, "success");
	}

	public static R error(int code, String msg) {
		R R = new R();
		R.setCode(code);
		R.setMsg(msg);
		return R;
	}

	public static R error() {
		return error(1, "error");
	}

	public R(int code, Object data) {
		super();
		this.code = code;
		this.data = data;
	}

	public R(int code, String msg, Object data) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	public R(int code, String msg, Object data, Integer count) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
		this.count = count;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
}
