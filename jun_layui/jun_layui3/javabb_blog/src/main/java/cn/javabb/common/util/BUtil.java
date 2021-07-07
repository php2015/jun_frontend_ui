package cn.javabb.common.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import cn.javabb.content.entity.Blog;

public class BUtil {

	/**
	 * 
	 * 判断一个对象是否为空
	 * @param obj
	 * @return
	 */
	public static boolean isNull(Object obj) {
		if (obj == null)
			return true;
		if ("null".equals(obj))
			return true;
		if (obj.toString().trim().equals(""))
			return true;
		return false;
	}
	
	/**
	 * 字符串是否等于空值(true不为空false为空)
	 * 
	 * @param String
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		if (str == null) {
			return false;
		}
		str = str.trim();
		if ("".equals(str)) {
			return false;
		}
		if ("null".equalsIgnoreCase(str)) {
			return false;
		}
		return true;
	}
	
}
