package com.jacarrichan.demo.common.models;

import java.io.Serializable;

public class Response<T> implements Serializable {

	private boolean success;

	private T result;

	private String errorCode;

	private String errorMsg;

	public Response(T result) {
		this.success = true;
		this.result = result;
	}

	public Response(String errorCode, String errorMsg) {
		this.success = false;
		this.errorCode = errorCode;
		this.errorMsg = errorMsg;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

}
