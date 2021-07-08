package com.jeasy.util;

import java.util.*;

import org.apache.commons.lang3.StringUtils;

/**
 * 随机工具类
 *
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class RandomUtils {

	private static final Random random = new Random();

	private RandomUtils() {
	}

    /**
     * 随机取size个列表，随机排序
     * 
     * @param list
     * @return
     * @return
     */
    public static <T> T random(final List<T> list) {
        if (list != null) {
            List<T> result = new ArrayList<>(list.size());
            result.addAll(list);
            Collections.shuffle(result);
            if (result.size() >= 1) {
                return result.get(0);
            }
        }
		return null;
    }

    /**
     * 随机取size个列表，随机排序
     * 
     * @param list
     * @param size
     * @return
     */
    public static <T> List<T> random(final List<T> list, int size) {
        if (list != null) {
            List<T> result = new ArrayList<>(list.size());
            result.addAll(list);
            Collections.shuffle(result);
            if (result.size() >= size) {
                return result.subList(0, size);
            }
        }
		return Collections.emptyList();
    }

    /**
     * 随机取size个列表，随机排序，当size足够的情况下，排除excludeList里的元素，
     * @param list
     * @param excludeList
     * @param size
     * @return
     */
    public static <T> List<T> random(final List<T> list, final List<T> excludeList, int size) {
        if (list != null) {
            List<T> result = new ArrayList<>(list.size());
            result.addAll(list);
            //如果list总数多余size+excludeList
            if (result.size() >= size + (excludeList != null ? excludeList.size() : 0)) {
                result.removeAll(excludeList);
            }
            Collections.shuffle(result);
            if (result.size() >= size) {
                return result.subList(0, size);
            } else {
                return result;
            }
        } else {
            return Collections.emptyList();
        }
    }

	/**
	 * 生成num个长度为length的字符串（字符串各不相同）,字符串只包含字母
	 *
	 * @param length 字符串的长度
	 * @param num 字符串的个数
	 * @return
	 */
	public static String[] random(final int length, final int num) {
		return buildRandom(length, num);
	}


	/**
	 * 生成长度为length的字符串,字符串只包含数字
	 *
	 * @param length 字符串的长度
	 * @return
	 */
	public static String random(final int length) {
		return buildRandom(length);
	}

	/**
	 * 生成num个长度为length的字符串，组成如 123-123-123 格式(只包含数字)
	 *
	 * @param length
	 * @param num
	 * @return
	 */
	public static String randomBunch(int length, int num) {
		StringBuffer str = new StringBuffer();
		for (int i = 0; i < num; i++) {
			str.append(RandomUtils.random(length));
			if (i != num - 1)
				str.append("-");
		}
		return str.toString();
	}

	/**
	 * 生成num个长度为length的字符串（字符串各不相同）,字符串只包含字母
	 *
	 * @param length 字符串的长度
	 * @param num 字符串的个数
	 * @return
	 */
	public static String[] buildRandom(final int length, final int num) {
		if (num < 1 || length < 1) {
			return null;
		}
		Set<String> tempSet = new HashSet<>(num); // 存放临时结果，以避免重复值的发生

		// 生成num个不相同的字符串
		while (tempSet.size() < num) {
			tempSet.add(buildRandom(length));
		}

		String[] set = new String[num];
		set = tempSet.toArray(set);
		return set;
	}

	/**
	 * 返回指定位数的整数
	 *
	 * @param length
	 * @return
	 */
	public static int buildIntRandom(final int length) {
		String maxStr = StringUtils.rightPad("1", length + 1, '0');
		long max = Long.parseLong(maxStr);
		long i = Math.abs(random.nextLong()) % max;
		String rand = String.valueOf(i);
		return Integer.parseInt(rand);
	}

	/**
	 * 取小于指定范围内的整数
	 *
	 * @param length
	 * @return
	 */
	public static int buildIntRandomBy(final int length) {
		return (int) (Math.random() * length);
	}

	/**
	 * 生成长度为length的字符串,字符串只包含数字
	 *
	 * @param length 字符串的长度
	 * @return
	 */
	public static String buildRandom(final int length) {
		// 长度为length的最多整数
		String maxStr = StringUtils.rightPad("1", length + 1, '0');
		long max = Long.parseLong(maxStr);
		long i = random.nextLong(); // 取得随机数
		i = Math.abs(i) % max; // 取正数，并限制其长度
		String value = StringUtils.leftPad(String.valueOf(i), length, '0');
		return value;
	}
}
