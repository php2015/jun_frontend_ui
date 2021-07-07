package com.jacarrichan.demo.common.models;

public class AppCoreException extends AppException {
	private static final long serialVersionUID = 6935164515250203789L;

	public AppCoreException(String errorCode, String errorMsg) {
		super(errorCode, errorMsg);
	}


}
