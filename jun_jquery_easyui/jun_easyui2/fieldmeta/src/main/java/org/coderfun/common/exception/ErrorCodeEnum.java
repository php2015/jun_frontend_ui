package org.coderfun.common.exception;

import klg.j2ee.common.model.IErrorCode;

/**
 * 错误码，参考新浪微博 open api
 * 
 * <pre>
https://blog.csdn.net/huangwenyi1010/article/details/51581906
 * </pre>
 * 
 * <pre>
 错误码格式说明（示例：202001），1为系统级错误，2为业务逻辑错误
--------------------------------------------------------------------
服务级错误（1为系统级错误）	服务模块代码(即业务模块标识)		具体错误代码
        2                            02	                    001
--------------------------------------------------------------------
 * </pre>
 * 
 * @author klguang
 *
 */

public enum ErrorCodeEnum implements IErrorCode {
	
	
	UNKNOWN_ERROR(-1L,"未知错误！"),
	ENTITY_HAS_RELATED_DATA(202001L, "已经有关联数据，无法删除！"),
	DATA_EXISTED(202002L,"重复的数据！"),
	DATA_INTEGRITY_ERROR(202001L,"数据不合法或重复的字段值！"),
	DATA_NOTEXIST(202003L,"数据不存在！"),
		
	BADPARAM(203001L,"错误的请求参数错误！");
	
	
	Long code;
	String messageFormat;

	private ErrorCodeEnum(Long code, String messageFormat) {
		this.code = code;
		this.messageFormat = messageFormat;
	}

	@Override
	public long getCode() {
		// TODO Auto-generated method stub
		return this.code;
	}

	@Override
	public String getMessageFormat() {
		// TODO Auto-generated method stub
		return this.messageFormat;
	}

}
