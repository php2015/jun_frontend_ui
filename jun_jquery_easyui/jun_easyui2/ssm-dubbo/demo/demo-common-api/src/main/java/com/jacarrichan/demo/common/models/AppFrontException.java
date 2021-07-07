package com.jacarrichan.demo.common.models;

public class AppFrontException extends AppException {

	public AppFrontException(String errorCode, String errorMsg) {
		super(errorCode, errorMsg);
	}

	private static final long serialVersionUID = 6935164515250203789L;

}
