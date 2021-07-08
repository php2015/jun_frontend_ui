package com.jeasy.util;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 数据处理工具类
 *
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class DataUtils {

	private DataUtils() {
	}

	/**
	 * 检测是否为手机号码
	 *
	 * @param  tel
	 * @return boolean
	 */
	public static boolean checkTelephone(String tel) {
		String regExp = "^((13[0-9])|(15[0-9])|(18[0-9]))\\d{8}$";
		Pattern p = Pattern.compile(regExp);
		Matcher m = p.matcher(tel.trim());
		return m.find();
	}

	/**
	 * 将金额（1.00）转为100
	 * 即单位从元转为分
	 *
	 * @param price
	 * @return
	 */
	public static String priceTofen(String price) {
		BigDecimal bd = new BigDecimal(price);
		BigDecimal bd2 = new BigDecimal(100);
		BigInteger re = bd.multiply(bd2).toBigInteger();
		return re.toString();
	}

	/**
	 * 将金额（1）转为1.00
	 *
	 * @param price
	 * @return
	 */
	public static String priceToString(String price) {
		int idx = price.indexOf(".");
		if (idx == -1) {
			return price + ".00";
		}
		int pos = price.substring(idx + 1).length();
		if (pos == 1) {
			return price + "0";
		}
		if (pos > 2) {
			return price.substring(0, idx + 3);
		}
		return price;
	}

	/**
	 * 乘以
	 *
	 * @return
	 */
	public static String multiply(String arg1, String arg2) {
		BigDecimal bg1 = new BigDecimal(arg1);
		BigDecimal bg2 = new BigDecimal(arg2);
		return bg1.multiply(bg2).toString();
	}

	/**
	 * 将byte数组转换为表示16进制值的字符串， 如：byte[]{8,18}转换为：0813， 和public static byte[] hexStr2ByteArr(String strIn) 互为可逆的转换过程
	 *
	 * @param arrB 需要转换的byte数组
	 * @return 转换后的字符串
	 */
	public static String byteArr2HexStr(byte[] arrB) {
		int iLen = arrB.length;
		// 每个byte用两个字符才能表示，所以字符串的长度是数组长度的两倍
		StringBuffer sb = new StringBuffer(iLen * 2);
		for (int i = 0; i < iLen; i++) {
			int intTmp = arrB[i];
			// 把负数转换为正数
			while (intTmp < 0) {
				intTmp = intTmp + 256;
			}
			// 小于0F的数需要在前面补0
			if (intTmp < 16) {
				sb.append("0");
			}
			sb.append(Integer.toString(intTmp, 16));
		}
		return sb.toString();
	}

	/**
	 * 将表示16进制值的字符串转换为byte数组， 和public static String byteArr2HexStr(byte[] arrB) 互为可逆的转换过程
	 *
	 * @param strIn 需要转换的字符串
	 * @return 转换后的byte数组
	 */
	public static byte[] hexStr2ByteArr(String strIn) {
		byte[] arrB = strIn.getBytes();
		int iLen = arrB.length;
		// 两个字符表示一个字节，所以字节数组长度是字符串长度除以2
		byte[] arrOut = new byte[iLen / 2];
		for (int i = 0; i < iLen; i = i + 2) {
			String strTmp = new String(arrB, i, 2);
			arrOut[i / 2] = (byte) Integer.parseInt(strTmp, 16);
		}
		return arrOut;
	}
}
