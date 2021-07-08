package cn.javabb.common.util;

import java.util.UUID;
/**
 * 生成uuid
 * @author javabb
 *
 */
public class UUIDUtil {

	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}
	
	public static void main(String[] args) {
		System.out.println(getUUID());
	}
}
