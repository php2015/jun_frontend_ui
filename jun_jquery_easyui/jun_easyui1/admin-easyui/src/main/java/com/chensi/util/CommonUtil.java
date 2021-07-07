package com.chensi.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.util.StringUtils;
import org.springframework.web.context.ContextLoader;

/**
 * 类描述：公共工具类
 * @author chensi
 * @version 2016-5-18 下午5:15:51
 */
public class CommonUtil {

	/**
	 * 方法描述：获取异常完整堆栈信息
	 * @param e 异常信息
	 * @return 异常完整堆栈信息
	 */
	public static List<String> getExceptionStack(Throwable e) {
		List<String> retList = new ArrayList<String>();
		StringWriter sw = null;
		PrintWriter pw = null;
		try {
			sw = new StringWriter();
			pw = new PrintWriter(sw);
			// 将出错的栈信息输出到printWriter中
			e.printStackTrace(pw);
			pw.flush();
			sw.flush();
		} finally {
			if (sw != null) {
				try {
					sw.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			if (pw != null) {
				pw.close();
			}
		}
		String[] arr = sw.toString().split("\r\n");
		Collections.addAll(retList, arr);
		return retList;
	}

	/**
	 * 方法描述：获取servlet上下文
	 * @return ServletContext
	 */
	public static ServletContext getServletContext() {
		return ContextLoader.getCurrentWebApplicationContext().getServletContext();
	}

	/**
	 * 方法描述：数字前导填零
	 * @param num 待填零的数字 width 需要的数字宽度
	 * @return 填零后的数字字符串形式
	 */
	public static String getPreFillNum(int num, int width) {
		String strNum = String.valueOf(num);
		int len = strNum.length();
		if (num <= 0 || width - len <= 0) {
			return String.valueOf(num);
		}
		for (int i = 0; i < width - len; i++) {
			strNum = "0" + strNum;
		}
		return strNum;
	}

	/**
	 * 方法描述：根据位数获取随机数
	 * @param width 位数
	 * @return 随机数
	 */
	public static String getRandomNum(int width) {
		StringBuilder result = new StringBuilder();
		result.append(String.valueOf((long) (new Date().getTime() * Math.random() * 1000)));
		int len = result.length();
		if (len < width) {
			for (int i = width - len; i > 0; i--) {
				result.insert(0, "0");
			}
		} else {
			return result.substring(len - width, len);
		}
		return result.toString();
	}

	/**
	 * Description: 获取指定位数的随机字符串
	 * @param width 位数
	 * @return 随机字符串
	 */
	public static String getRandomStr(int width) {
		String result = "";
		String word = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
		for (int i = 0; i < width; i++) {
			int d = (int) (Math.random() * word.length());
			result += word.charAt(d);
		}
		return result;
	}

	/**
	 * 字符串是否以指定后缀结尾
	 * @param str 待检查字符串 suffix 后缀
	 * @return 是否以指定后缀结尾
	 */
	public static boolean endsWithIgnoreCase(String str, String suffix) {
		return !(!StringUtils.hasLength(str) || !StringUtils.hasLength(suffix) || str.length() < suffix.length())
				&& str.substring(str.length() - suffix.length()).equalsIgnoreCase(suffix);
	}

	/**
	 * 从集合中获取目标对象(如果集合中存在)
	 * @param c 待查找集合
	 * @param target 待比较对象
	 * @return 当集合中有对象满足e.equals(target)时, 返回e, 否则返回null
	 */
	public static <T> T getFromCollection(Collection<T> c, T target) {
		if (c == null || target == null) {
			return null;
		}
		Iterator<T> iter = c.iterator();
		while (iter.hasNext()) {
			T t = iter.next();
			if (t != null && t.equals(target)) {
				return t;
			}
		}
		return null;
	}

	/**
	 * Integer转String
	 */
	public static String integerToString(Integer value) {
		return value == null ? "" : value.toString();
	}

	/**
	 * String转Integer工具类
	 */
	public static Integer stringToInteger(String str) {
		return StringUtils.hasLength(str) ? Integer.valueOf(str) : null;
	}

	/**
	 * 判断List集合是否为空
	 */
	public static boolean isEmptyList(Collection list) {
		return null == list || list.isEmpty();
	}

	/**
	 * 判断List集合是不为空
	 */
	public static boolean isNotEmptyList(Collection list) {
		return !isEmptyList(list);
	}

	/**
	 * 判断Obejct是否为空（有一个为空就为空）
	 * @param arr
	 * @return
	 */
	public static boolean containsEmptyObejct(Object... arr) {
		for (Object o : arr) {
			if (o == null) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 比较时间大小
	 * @param source
	 * @param target
	 * @return 1表示前者大于后者 -1表示前者小于后者 0表示相等
	 * @throws ParseException
	 */
	public static int compareDate(String source, String target) throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date1 = df.parse(source);
		Date date2 = df.parse(target);
		return date1.compareTo(date2);
	}

	/**
	 * 和当前时间比较
	 * @param source
	 * @return 1表示前者大于后者 -1表示前者小于后者 0表示相等
	 * @throws ParseException
	 */
	public static int compareNow(String source) throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = df.parse(source);
		return date1.compareTo(new Date());
	}
	
	/**
	 * 转换为金额  x.xx
	 * @param fee
	 * @return
	 */
	public static String formatMoney(Float fee) {
		if(fee==null||fee==0){
			return "0.00";
		}
		//#表示没有则为空，0表示如果没有则该位补0.
		return new DecimalFormat("0.00").format(fee);
	}

}