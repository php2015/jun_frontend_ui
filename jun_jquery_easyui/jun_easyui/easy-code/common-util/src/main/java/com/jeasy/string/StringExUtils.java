package com.jeasy.string;

import java.text.NumberFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.jeasy.security.MD5Utils;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class StringExUtils {

	private StringExUtils() {
	}

	private static final char SEPARATOR = '_';

	/**
	 * 判断是否为中文
	 *
	 * @param str
	 * @return
	 */
	public static boolean isChinese(String str) {
		boolean result = false;
		for (int i = 0; i < str.length(); i++) {
			int chr1 = str.charAt(i);
			if (chr1 >= 19968 && chr1 <= 171941) {// 汉字范围 \u4e00-\u9fa5 (中文)
				result = true;
			}
		}
		return result;
	}

	/**
	 * 把中文转成Unicode码
	 *
	 * @param str
	 * @return
	 */
	public static String chinaToUnicode(String str) {
		String result = "";
		for (int i = 0; i < str.length(); i++) {
			int chr1 = str.charAt(i);
			if (chr1 >= 19968 && chr1 <= 171941) {// 汉字范围 \u4e00-\u9fa5 (中文)
				result += "\\u" + Integer.toHexString(chr1);
			} else {
				result += str.charAt(i);
			}
		}
		return result;
	}

	/**
	 * 判断是否为空
	 *
	 * @param obj
	 * @return
	 */
	public static boolean isNullOrEmpty(Object obj) {
		if (null == obj) {
			return true;
		} else if ("".equals(obj)) {
			return true;
		}
		return false;
	}

	public static boolean isNotNullOrEmpty(Object obj) {
		return !isNullOrEmpty(obj);
	}

	public static String getUniqueName(String filename) {
		return getUUID() + filename.substring(filename.lastIndexOf("."));
	}

	public static String getUUID() {
		return UUID.randomUUID().toString();
	}

	public static String getSimpleUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 32位FNV算法
	 *
	 * @param data
	 *               字符串
	 * @return String hash
	 */
	public static String hash(String data) {

		return data.hashCode() + "";
	}

	/**
	 * 首字母转小写
	 *
	 * @param s
	 * @return
	 */
	public static String toLowerCaseFirstOne(String s) {
		if (Character.isLowerCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toLowerCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}

	/**
	 * 首字母转大写
	 *
	 * @param s
	 * @return
	 */
	public static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toUpperCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}

	public static String transNullToString(String value) {
		value = value == null ? "" : value;
		return value;
	}

	public static boolean isInvalieStringArray(String[] array) {
		if (array == null || array.length == 0) return true;
		for (String s : array) {
			if (StringUtils.isNotBlank(s)) {
				return false;
			}
		}
		return true;
	}

	public static String[] removeEmptyElement(String[] array) {
		List<String> result = Lists.newArrayList();
		for (String s : array) {
			if (StringUtils.isNotBlank(s)) {
				result.add(s);
			}
		}
		return result.toArray(new String[result.size()]);
	}

	public static boolean isArrayContainString(String[] strArray, String string) {
		if (("".equals(string)) || (string == null)) {
			return false;
		}
		for (int i = 0; i < strArray.length; i++) {
			if (string.equals(strArray[i])) {
				return true;
			}
		}
		return false;
	}

	public static String[] splitStringToArray(String string, String split) {
		StringTokenizer stT = new StringTokenizer(string, split);
		String[] strArr = new String[stT.countTokens()];
		int i = 0;
		while (stT.hasMoreTokens()) {
			strArr[i] = stT.nextToken();
			i++;
		}
		return strArr;
	}

	public static String formatEditorToHtml(String value) {
		if (value == null) {
			return "";
		}
		char[] content = new char[value.length()];
		value.getChars(0, value.length(), content, 0);
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < content.length; i++) {
			switch (content[i]) {
				case '\r':
					result.append("");
					break;
				case '\n':
					result.append("");
					break;
				case '\013':
				case '\f':
				default:
					result.append(content[i]);
			}
		}
		return result.toString();
	}

	public static String formatHtmlToStr(String input) {
		if (input == null) {
			return null;
		}
		char[] s = input.toCharArray();
		int length = s.length;
		StringBuffer ret = new StringBuffer(length);

		for (int i = 0; i < length; i++) {
			if (s[i] == '&') {
				if (((i + 3) < length) &&
						(s[i + 1] == 'l') &&
						(s[i + 2] == 't') &&
						(s[i + 3] == ';')) { // &lt; = <
					ret.append('<');
					i += 3;
				} else if (((i + 3) < length) &&
						(s[i + 1] == 'g') &&
						(s[i + 2] == 't') &&
						(s[i + 3] == ';')) { // &gt; = >
					ret.append('>');
					i += 3;
				} else if (((i + 4) < length) &&
						(s[i + 1] == 'a') &&
						(s[i + 2] == 'm') &&
						(s[i + 3] == 'p') &&
						(s[i + 4] == ';')) { // &amp; = &
					ret.append('&');
					i += 4;
				} else if (((i + 5) < length) &&
						(s[i + 1] == 'q') &&
						(s[i + 2] == 'u') &&
						(s[i + 3] == 'o') &&
						(s[i + 4] == 't') &&
						(s[i + 5] == ';')) { // &quot; = "
					ret.append('"');
					i += 5;
				} else {
					ret.append('&');
				}
			} else {
				ret.append(s[i]);
			}
		}// for
		return ret.toString().replaceAll("lt;", "<").replaceAll("gt;", ">");
	}

	public static String formatStringToHtml(String value) {
		if (value == null) {
			return "";
		}
		char[] content = new char[value.length()];
		value.getChars(0, value.length(), content, 0);
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < content.length; i++) {
			switch (content[i]) {
				case '\r':
					result.append("");
					break;
				case '\n':
					result.append("<br/>");
					break;
				case '\t':
					result.append("    ");
					break;
				case '\\':
					result.append("/");
					break;
				case '&':
					result.append("&amp;");
					break;
				case '<':
					result.append("&lt;");
					break;
				case '>':
					result.append("&gt;");
					break;
				case '"':
					result.append("&quot;");
					break;
				case '\'':
					result.append("&#39;");
					break;
				default:
					result.append(content[i]);
			}
		}
		return result.toString();
	}

	public static String formatStringToXML(String value) {
		if (value == null) {
			return "";
		}
		char[] content = new char[value.length()];
		value.getChars(0, value.length(), content, 0);
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < content.length; i++) {
			switch (content[i]) {
				case '&':
					result.append("&amp;");
					break;
				case '<':
					result.append("&lt;");
					break;
				case '>':
					result.append("&gt;");
					break;
				case '"':
					result.append("&quot;");
					break;
				case '\'':
					result.append("&#39;");
					break;
				default:
					result.append(content[i]);
			}
		}
		return result.toString();
	}

	public static boolean hasLength(String str) {
		return (str != null) && (str.length() > 0);
	}

	public static boolean hasText(String str) {
		int strLen;
		if ((str == null) || ((strLen = str.length()) == 0))
			return false;
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return true;
			}
		}
		return false;
	}

	public static String trimLeadingWhitespace(String str) {
		if (str.length() == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str);
		while ((buf.length() > 0) && (Character.isWhitespace(buf.charAt(0)))) {
			buf.deleteCharAt(0);
		}
		return buf.toString();
	}

	public static String trimTrailingWhitespace(String str) {
		if (str.length() == 0) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str);
		while ((buf.length() > 0) && (Character.isWhitespace(buf.charAt(buf.length() - 1)))) {
			buf.deleteCharAt(buf.length() - 1);
		}
		return buf.toString();
	}

	public static boolean startsWithIgnoreCase(String str, String prefix) {
		if ((str == null) || (prefix == null)) {
			return false;
		}
		if (str.startsWith(prefix)) {
			return true;
		}
		if (str.length() < prefix.length()) {
			return false;
		}
		String lcStr = str.substring(0, prefix.length()).toLowerCase();
		String lcPrefix = prefix.toLowerCase();
		return lcStr.equals(lcPrefix);
	}

	public static int countOccurrencesOf(String str, String sub) {
		if ((str == null) || (sub == null) || (str.length() == 0) || (sub.length() == 0)) {
			return 0;
		}
		int count = 0;
		int pos = 0;
		int idx;
		while ((idx = str.indexOf(sub, pos)) != -1) {
			count++;
			pos = idx + sub.length();
		}
		return count;
	}

	public static String replace(String inString, Map<String, String> params) {

		if (StringUtils.isBlank(inString) || params == null || params.isEmpty()) {
			return inString;
		}

		for (String paramKay : params.keySet()) {
			String paramValue = params.get(paramKay);
			paramKay = "\\{" + paramKay + "\\}";
			inString = inString.replaceAll(paramKay, paramValue);
		}

		return inString;
	}

	public static String replace(String inString, String oldPattern, String newPattern) {
		if (inString == null) {
			return null;
		}
		if ((oldPattern == null) || (newPattern == null)) {
			return inString;
		}
		StringBuffer sbuf = new StringBuffer();

		int pos = 0;
		int index = inString.indexOf(oldPattern);

		int patLen = oldPattern.length();
		while (index >= 0) {
			sbuf.append(inString.substring(pos, index));
			sbuf.append(newPattern);
			pos = index + patLen;
			index = inString.indexOf(oldPattern, pos);
		}
		sbuf.append(inString.substring(pos));

		return sbuf.toString();
	}

	public static String delete(String inString, String pattern) {
		return replace(inString, pattern, "");
	}

	public static String deleteAny(String inString, String charsToDelete) {
		if ((inString == null) || (charsToDelete == null)) {
			return inString;
		}
		StringBuffer out = new StringBuffer();
		for (int i = 0; i < inString.length(); i++) {
			char c = inString.charAt(i);
			if (charsToDelete.indexOf(c) == -1) {
				out.append(c);
			}
		}
		return out.toString();
	}

	public static String unqualify(String qualifiedName) {
		return unqualify(qualifiedName, '.');
	}

	public static String unqualify(String qualifiedName, char separator) {
		return qualifiedName.substring(qualifiedName.lastIndexOf(separator) + 1);
	}

	public static String capitalize(String str) {
		return changeFirstCharacterCase(str, true);
	}

	public static String uncapitalize(String str) {
		return changeFirstCharacterCase(str, false);
	}

	private static String changeFirstCharacterCase(String str, boolean capitalize) {
		if ((str == null) || (str.length() == 0)) {
			return str;
		}
		StringBuffer buf = new StringBuffer(str.length());
		if (capitalize) {
			buf.append(Character.toUpperCase(str.charAt(0)));
		} else {
			buf.append(Character.toLowerCase(str.charAt(0)));
		}
		buf.append(str.substring(1));
		return buf.toString();
	}

	public static String getFilename(String path) {
		int separatorIndex = path.lastIndexOf("/");
		return separatorIndex != -1 ? path.substring(separatorIndex + 1) : path;
	}

	public static String applyRelativePath(String path, String relativePath) {
		path = path.replace("\\", "/");
		boolean isEnd = path.endsWith("/");
		String newDirectory = path;
		if (isEnd) {
			newDirectory = path.substring(0, path.length() - 1);
		}
		if (!relativePath.startsWith("/")) {
			newDirectory = newDirectory + "/";
		}
		return newDirectory + relativePath;
	}

	public static String applyRelativeDirectory(String path, String relativeDirectory) {
		path = path.replace("\\", "/");
		boolean isEnd = path.endsWith("/");
		String newDirectory = path;
		if (isEnd) {
			newDirectory = path.substring(0, path.length() - 1);
		}
		if (!relativeDirectory.startsWith("/")) {
			newDirectory = newDirectory + "/";
		}
		return newDirectory + relativeDirectory;
	}

	public static String cleanPath(String path) {
		String pathToUse = replace(path, "\\", "/");
		String[] pathArray = delimitedListToStringArray(pathToUse, "/");
		List<String> pathElements = Lists.newLinkedList();
		int tops = 0;
		for (int i = pathArray.length - 1; i >= 0; i--) {
			if (".".equals(pathArray[i])) {
				continue;
			}
			if ("..".equals(pathArray[i])) {
				tops++;
			} else if (tops > 0) {
				tops--;
			} else {
				pathElements.add(0, pathArray[i]);
			}
		}

		return collectionToDelimitedString(pathElements, "/");
	}

	public static boolean pathEquals(String path1, String path2) {
		return cleanPath(path1).equals(cleanPath(path2));
	}

	public static Locale parseLocaleString(String localeString) {
		String[] parts = tokenizeToStringArray(localeString, "_ ", false, false);
		String language = parts.length > 0 ? parts[0] : "";
		String country = parts.length > 1 ? parts[1] : "";
		String variant = parts.length > 2 ? parts[2] : "";
		return language.length() > 0 ? new Locale(language, country, variant) : null;
	}

	public static String[] addStringToArray(String[] arr, String str) {
		String[] newArr = new String[arr.length + 1];
		System.arraycopy(arr, 0, newArr, 0, arr.length);
		newArr[arr.length] = str;
		return newArr;
	}

	public static String[] sortStringArray(String[] source) {
		if (source == null) {
			return new String[0];
		}
		Arrays.sort(source);
		return source;
	}

	public static String[] tokenizeToStringArray(String str, String delimiters) {
		return tokenizeToStringArray(str, delimiters, true, true);
	}

	public static String[] tokenizeToStringArray(String str, String delimiters, boolean trimTokens,
												 boolean ignoreEmptyTokens) {
		StringTokenizer st = new StringTokenizer(str, delimiters);
		List<String> tokens = Lists.newArrayList();
		while (st.hasMoreTokens()) {
			String token = st.nextToken();
			if (trimTokens) {
				token = token.trim();
			}
			if ((!ignoreEmptyTokens) || (token.length() > 0)) {
				tokens.add(token);
			}
		}
		return tokens.toArray(new String[tokens.size()]);
	}

	public static String[] delimitedListToStringArray(String str, String delimiter) {
		if (str == null) {
			return new String[0];
		}
		if (delimiter == null) {
			return new String[]{str};
		}

		List<String> result = Lists.newArrayList();
		int pos = 0;
		int delPos;
		while ((delPos = str.indexOf(delimiter, pos)) != -1) {
			result.add(str.substring(pos, delPos));
			pos = delPos + delimiter.length();
		}
		if ((str.length() > 0) && (pos <= str.length())) {
			result.add(str.substring(pos));
		}

		return result.toArray(new String[result.size()]);
	}

	public static String[] commaDelimitedListToStringArray(String str) {
		return delimitedListToStringArray(str, ",");
	}

	public static Set<String> commaDelimitedListToSet(String str) {
		Set<String> set = Sets.newTreeSet();
		String[] tokens = commaDelimitedListToStringArray(str);
		for (int i = 0; i < tokens.length; i++) {
			set.add(tokens[i]);
		}
		return set;
	}

	public static String arrayToDelimitedString(Object[] arr, String delim) {
		if (arr == null) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			if (i > 0) {
				sb.append(delim);
			}
			sb.append(arr[i]);
		}
		return sb.toString();
	}

	public static <T> String collectionToDelimitedString(Collection<T> coll, String delim, String prefix, String suffix) {
		if (coll == null) {
			return "";
		}

		StringBuffer sb = new StringBuffer();
		Iterator<T> it = coll.iterator();
		int i = 0;
		while (it.hasNext()) {
			if (i > 0) {
				sb.append(delim);
			}
			sb.append(prefix).append(it.next()).append(suffix);
			i++;
		}
		return sb.toString();
	}

	public static <T> String collectionToDelimitedString(Collection<T> coll, String delim) {
		return collectionToDelimitedString(coll, delim, "", "");
	}

	public static String arrayToCommaDelimitedString(Object[] arr) {
		return arrayToDelimitedString(arr, ",");
	}

	public static <T> String collectionToCommaDelimitedString(Collection<T> coll) {
		return collectionToDelimitedString(coll, ",");
	}

	public static String percent(double p1, double p2) {
		double p3 = p1 / p2;
		NumberFormat nf = NumberFormat.getPercentInstance();
		nf.setMinimumFractionDigits(0);
		String str = nf.format(p3);
		return str;
	}

	public static String filterString(String str) {
		if (StringUtils.isBlank(str))
			return str;
		str = str.trim();
		String[] filter = {"+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^", "\"", "~", "*", "?", ":",
				"\\", ";"};
		for (String s : filter) {
			str = StringUtils.replace(str, s, " ");
		}
		return str;
	}

	public static String StringFilter(String str) throws PatternSyntaxException {
		// 只允许数字        
		String regEx = "[^0-9]";
		// 清除掉所有特殊字符  
		//String regEx = "[`~!@#$%^&*()+=|{}':;',//[//].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		return m.replaceAll("").trim();
	}

	/**
	 * 检测是否有emoji字符
	 *
	 * @param source
	 * @return 一旦含有就抛出
	 */
	public static boolean containsEmoji(String source) {
		if (StringUtils.isBlank(source)) {
			return false;
		}

		int len = source.length();

		for (int i = 0; i < len; i++) {
			char codePoint = source.charAt(i);

			if (isEmojiCharacter(codePoint)) {
				//do nothing，判断到了这里表明，确认有表情字符
				return true;
			}
		}

		return false;
	}

	private static boolean isEmojiCharacter(char codePoint) {
		return (codePoint == 0x0) ||
				(codePoint == 0x9) ||
				(codePoint == 0xA) ||
				(codePoint == 0xD) ||
				((codePoint >= 0x20) && (codePoint <= 0xD7FF)) ||
				((codePoint >= 0xE000) && (codePoint <= 0xFFFD)) ||
				((codePoint >= 0x10000) && (codePoint <= 0x10FFFF));
	}

	/**
	 * 过滤emoji 或者 其他非文字类型的字符
	 *
	 * @param source
	 * @return
	 */
	public static String filterEmoji(String source) {

		if (!containsEmoji(source)) {
			return source;//如果不包含，直接返回
		}
		//到这里铁定包含
		StringBuilder buf = null;

		int len = source.length();

		for (int i = 0; i < len; i++) {
			char codePoint = source.charAt(i);

			if (isEmojiCharacter(codePoint)) {
				if (buf == null) {
					buf = new StringBuilder(source.length());
				}

				buf.append(codePoint);
			}
		}

		if (buf == null) {
			return source;//如果没有找到 emoji表情，则返回源字符串
		} else {
			if (buf.length() == len) {//这里的意义在于尽可能少的toString，因为会重新生成字符串
				buf = null;
				return source;
			} else {
				return buf.toString();
			}
		}

	}

	public static String Html2Text(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_script;
		Matcher m_script;
		Pattern p_style;
		Matcher m_style;
		Pattern p_html;
		Matcher m_html;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式
			//String regEx_html = "<[^>]+>"; //定义HTML标签的正则表达式
			String regEx_htmlWithoutDiv = "<(?!\\s*div)(?!/\\s*div)(?!\\s*/div)[^>]+>";   //包括div的不剔除  去除其它所有html标签
			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_html = Pattern.compile(regEx_htmlWithoutDiv,
					Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}

	public static String escapeStringParam(String param) {
		if (StringUtils.isEmpty(param)) {
			return param;
		}
		char[] paramArr = param.toCharArray();
		StringBuilder sb = new StringBuilder();
		for (char p : paramArr) {
			switch (p) {
				case '\'':
					sb.append("\\").append(p);
					break;
				case '\"':
					sb.append("\\").append(p);
					break;
				case '\\':
					sb.append("\\").append(p);
					break;
				case '&':
					sb.append("\\").append(p);
					break;
				case '_':
					sb.append("\\").append(p);
					break;
				default:
					sb.append(p);
			}
		}
		return sb.toString();
	}

	/**
	 * 计算两个字符串最长相同子串
	 *
	 * @param @param  s1
	 * @param @param  s2
	 * @param @return
	 * @return String
	 */
	public static String search(String s1, String s2) {
		String max = "";
		for (int i = 0; i < s1.length(); i++) {
			for (int j = i; j <= s1.length(); j++) {
				String sub = s1.substring(i, j);
				if ((s2.indexOf(sub) != -1) && sub.length() > max.length()) {
					max = sub;
				}
			}
		}
		return max;
	}

	/**
	 * 根据content,key,按预定算法计算hash值.
	 *
	 * @param text
	 * @param key
	 * @return 加密结果
	 */
	public static String hash(String text, String key) {
		// 0.检验输入合法性
		if (text == null) {
			throw new IllegalArgumentException("text can't be null");
		}
		if (key == null) {
			throw new IllegalArgumentException("key can't be null");
		}

		// 1.令S=MD5(key);将text末尾填0至16字节的整数倍(n),将补0后的text按16字节分组
		// 为c(1),c(2),...c(n);令b(1),b(2),...b(n)为中间变量;令最终结果为hash.
		String S = MD5Utils.md5(key);
		byte[] textData = text.getBytes();
		int len = textData.length;
		int n = (len + 15) / 16;
		byte[] tempData = new byte[n * 16];
		for (int i = len; i < n * 16; i++) {
			tempData[i] = 0;
		}
		System.arraycopy(textData, 0, tempData, 0, len);
		textData = tempData;
		String[] c = new String[n];
		for (int i = 0; i < n; i++) {
			c[i] = new String(textData, 16 * i, 16);
		}
		// end c
		String[] b = new String[n];
		String hash;

		// 2.计算b(i)
		// b(1)=MD5(S+c(1))
		// b(2)=MD5(b(1)+c(2))
		// ...
		// b(n)=MD5(b(n-1)+c(n))
		String temp = S;
		String target = "";
		for (int i = 0; i < n; i++) {
			b[i] = MD5Utils.md5(temp + c[i]);
			temp = b[i];
			target += b[i];
		}

		// 3.hash=MD5(b(1)+b(2)+...+b(n))
		hash = MD5Utils.md5(target);
		return hash;
	}

	/**
	 * 骆驼峰结构: 比如gmt_modify ==> gmtModify
	 * @param name
	 * @return
	 */
	public static String toCamelName(String name) {
		char[] chars = name.toCharArray();
		char[] result = new char[chars.length];
		int curPos = 0;
		boolean upperCaseNext = false;
		for(char ch:chars){
			if(ch == '_'){
				upperCaseNext = true;
			}else if(upperCaseNext){
				result[curPos++] = Character.toUpperCase(ch);
				upperCaseNext = false;
			}else{
				result[curPos++] = ch;
			}
		}
		return new String(result,0,curPos);
	}

	public static String toUnderlineName(String s) {
		if (s == null) {
			return null;
		}

		StringBuilder sb = new StringBuilder();
		boolean upperCase = false;
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);

			boolean nextUpperCase = true;

			if (i < (s.length() - 1)) {
				nextUpperCase = Character.isUpperCase(s.charAt(i + 1));
			}

			if ((i >= 0) && Character.isUpperCase(c)) {
				if (!upperCase || !nextUpperCase) {
					if (i > 0) sb.append(SEPARATOR);
				}
				upperCase = true;
			} else {
				upperCase = false;
			}

			sb.append(Character.toLowerCase(c));
		}

		return sb.toString();
	}

	public static String toCamelCase(String s) {
		if (s == null) {
			return null;
		}

		s = s.toLowerCase();

		StringBuilder sb = new StringBuilder(s.length());
		boolean upperCase = false;
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);

			if (c == SEPARATOR) {
				upperCase = true;
			} else if (upperCase) {
				sb.append(Character.toUpperCase(c));
				upperCase = false;
			} else {
				sb.append(c);
			}
		}

		return sb.toString();
	}
}