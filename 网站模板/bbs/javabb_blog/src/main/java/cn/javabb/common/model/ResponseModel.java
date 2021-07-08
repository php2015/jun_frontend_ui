package cn.javabb.common.model;

import java.util.Collection;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import groovy.transform.ToString;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Data
@EqualsAndHashCode(callSuper = false)
public class ResponseModel {
	private boolean success;
	private Object data;
	private long total;
	private long pages;
	private String msg;
	private Integer code;

	public boolean isSuccess() {
		return success;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public long getPages() {
		return pages;
	}

	public void setPages(long pages) {
		this.pages = pages;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public static ResponseModel Success(Object data) {
		ResponseModel res = new ResponseModel();
		res.setSuccess(true);
		res.setData(data);
		if (data instanceof Page) {
			res.setTotal(((Page) data).getTotal());
			res.setPages(((Page) data).getPages());

		} else if (data instanceof Collection) {
			res.setTotal(((Collection) data).size());
		} else {
			res.setTotal(1);
		}
		return res;
	}

	public static ResponseModel Success(Object data, Integer code) {
		ResponseModel res = Success(data);
		res.setCode(code);
		return res;
	}
	
	public static ResponseModel Success(Object data, long total) {
		ResponseModel res = new ResponseModel();
		res.setSuccess(true);
		res.setData(data);
		res.setTotal(total);
		return res;
	}

	public static ResponseModel Success(String msg) {
		ResponseModel res = new ResponseModel();
		res.setSuccess(true);
		res.setMsg(msg);
		
		return res;
	}

	public static ResponseModel Failure(String msg) {
		ResponseModel res = new ResponseModel();
		res.setSuccess(false);
		res.setMsg(msg);
		return res;
	}

	public static ResponseModel Failure(String msg, Integer code) {
		ResponseModel res = Failure(msg);
		res.setCode(code);
		return res;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public JSONArray resJsonArray() {
		return JSON.parseArray(JSON.toJSONString(data));

	}

	public String resJsonValue(String string) {

		return JSON.parseObject(JSON.toJSONString(data)).getString(string);

	}

	public String toString() {
		return "JSON:"+JSONObject.toJSONString(this);
	}
	
	public static ResponseModel table(Object data){
		ResponseModel res = Success(data);
		res.setCode(0);
		return res;
	}
}
