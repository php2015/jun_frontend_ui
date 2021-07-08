package com.chensi.util;

import org.apache.commons.lang3.StringUtils;

/**
 * 类型转换工具类
 * @author Chason
 * @version 2016-7-3 上午10:06:24
 */
public class ConvertUtil {

	/**
	 * String转Integer
	 * @param str
	 * @return
	 */
	public static Integer StringToInteger(String str) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		return new Integer(str);
	}

	/**
	 * Long转Integer
	 * @param num
	 * @return
	 */
	public static Integer LongToInteger(Long num) {
		if (num == null) {
			return null;
		}
		return new Long(num).intValue();
	}

	/**
	 * Integer转Long
	 * @param num
	 * @return
	 */
	public static Long IntegerToLong(Integer num) {
		if (num == null) {
			return null;
		}
		return new Long(num);
	}

	/**
	 * Integer转Double
	 * @param num
	 * @return
	 */
	public static Double IntegerToDouble(Integer num) {
		if (num == null) {
			return null;
		}
		return new Double(num);
	}

}
