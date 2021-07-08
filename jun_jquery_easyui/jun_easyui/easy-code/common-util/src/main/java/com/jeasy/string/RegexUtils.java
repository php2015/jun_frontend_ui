package com.jeasy.string;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class RegexUtils {

	private RegexUtils() {
	}

	/**
	 * Find all of the matched string with the specified regular expression
	 *
	 * @param s     -
	 *              the source string
	 * @param regex -
	 *              the expected regular expression
	 * @return the array of matched string
	 */
	public static String[] findAll(String s, String regex) {
		if (s == null || regex == null)
			return null;

		String[] matchedResult = null;

		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(s);

		boolean matched = matcher.find();
		if (matched) {
			matchedResult = new String[matcher.groupCount() + 1];

			for (int i = 0, n = matchedResult.length; i < n; ++i) {
				matchedResult[i] = matcher.group(i);
			}
		}

		return matchedResult;
	}

	public static List<String[]> findAllArr(String s, String regex) {
		if (s == null || regex == null)
			return null;
		List<String[]> list = new ArrayList<String[]>();
		String[] matchedRslts;

		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(s);

		while (matcher.find()) {
			matchedRslts = new String[matcher.groupCount() + 1];

			for (int i = 0, n = matchedRslts.length; i < n; ++i) {
				matchedRslts[i] = matcher.group(i);
			}
			list.add(matchedRslts);
		}

		return list;
	}

	/**
	 * Find the first matched string with the specified regular expression.<br>
	 * Note, even if multiple strings are matched, only the 1st matched string
	 * is returned.
	 *
	 * @param s     -
	 *              the source string
	 * @param regex -
	 *              the expected regular expression
	 * @return the array of matched string
	 */
	public static String find(String s, String regex) {
		String[] matchedRslts = findAll(s, regex);
		return (matchedRslts == null || matchedRslts.length <= 0) ? null
				: matchedRslts[0];
	}

	/**
	 * Find the first matched string with the specified regular expression.<br>
	 * Note, even if multiple strings are matched, only the 1st matched string
	 * is returned.
	 *
	 * @param s     -
	 *              the source string
	 * @param regex -
	 *              the expected regular expression
	 * @return the array of matched string
	 */
	public static String find(String s, String regex, int groupIndex) {
		String[] matchedRslts = findAll(s, regex);
		if (matchedRslts == null || matchedRslts.length < groupIndex + 1) {
			return null;
		}
		return matchedRslts[groupIndex];
	}

}
