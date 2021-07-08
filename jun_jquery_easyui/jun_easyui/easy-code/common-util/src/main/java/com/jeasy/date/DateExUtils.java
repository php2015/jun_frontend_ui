package com.jeasy.date;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.time.DateUtils;

import com.jeasy.collection.Twins;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public final class DateExUtils {

	private DateExUtils() {
	}

	// 各种时间格式
	public static final SimpleDateFormat DATE_TIME_SSS_SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

	public static final SimpleDateFormat DATE_TIME_SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static final SimpleDateFormat YYYYMMDDHHMMSS_SDF = new SimpleDateFormat("yyyyMMddHHmmss");

	public static final SimpleDateFormat SHORT_DATE_TIME_SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	public static final SimpleDateFormat DATE_SDF = new SimpleDateFormat("yyyy-MM-dd");

	public static final SimpleDateFormat YYYYMMDD_SDF = new SimpleDateFormat("yyyyMMdd");

	public static final SimpleDateFormat ZW_DATE_SDF = new SimpleDateFormat("yyyy年MM月dd日");

	public static final SimpleDateFormat TIME_SDF = new SimpleDateFormat("HH:mm:ss");

	public static final SimpleDateFormat SHORT_TIME_SDF = new SimpleDateFormat("HH:mm");

	// 以毫秒表示的时间
	public static final long DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

	public static final long HOUR_IN_MILLIS = 60 * 60 * 1000;

	public static final long MINUTE_IN_MILLIS = 60 * 1000;

	public static final long SECOND_IN_MILLIS = 1000;


	/**
	 * 按自然月将一段时间切分成若干段小区间
	 *
	 * @param begin 开始时间
	 * @param end   结束时间
	 * @return 一个List，其中每个原始是一对时间，指定了这个区间的开始和结束时间（例如2011-01-01 00:00:00到2011-02-01 00:00:00，使 用时因注意半闭半开), 保证升序
	 */
	public static List<Twins<Date>> getMonthlyRanges(Date begin, Date end) {
		List<Twins<Date>> ranges = new ArrayList<Twins<Date>>();
		Date rangeBegin = begin;
		Date rangeEnd;
		while (rangeBegin.compareTo(end) < 0) {
			rangeEnd = DateUtils.truncate(rangeBegin, Calendar.MONTH);
			rangeEnd = DateUtils.addMonths(rangeEnd, 1);
			if (rangeEnd.compareTo(end) > 0) {
				rangeEnd = end;
			}
			ranges.add(new Twins<>(rangeBegin, rangeEnd));
			rangeBegin = rangeEnd;
		}
		return ranges;
	}

	/**
	 * 获取较大日期
	 * @param lhs
	 * @param rhs
	 * @return
	 */
	public static Date max(Date lhs, Date rhs) {
		return lhs.after(rhs) ? lhs : rhs;
	}

	/**
	 * 获取较小日期
	 * @param lhs
	 * @param rhs
	 * @return
	 */
	public static Date min(Date lhs, Date rhs) {
		return lhs.before(rhs) ? lhs : rhs;
	}

	/**
	 * 是否同1分钟
	 * @param lhs
	 * @param rhs
	 * @return
	 */
	public static boolean isSameMinute(Date lhs, Date rhs) {
		return Math.abs(lhs.getTime() - rhs.getTime()) < TimeUnit.MILLISECONDS.convert(1, TimeUnit.MINUTES);
	}

	/**
	 * 最后一秒
	 * @param date
	 * @return
	 */
	public static Date endsOfDay(Date date) {
		date = DateUtils.truncate(date, Calendar.DATE);
		date = DateUtils.addDays(date, 1);
		date = DateUtils.addSeconds(date, -1);
		return date;
	}

	/**
	 * 获得当前日期时间
	 * 日期时间格式yyyy-MM-dd HH:mm:ss.SSS
	 *
	 * @return
	 */
	public static String currentDatetimeSSS() {
		return DATE_TIME_SSS_SDF.format(now());
	}

	/**
	 * 格式化日期时间
	 * 日期时间格式yyyy-MM-dd HH:mm:ss.SSS
	 * @param date
	 * @return
	 */
	public static String formatDatetimeSSS(Date date) {
		return DATE_TIME_SSS_SDF.format(date);
	}

	/**
	 * 获得当前日期时间
	 * 日期时间格式yyyy-MM-dd HH:mm:ss
	 *
	 * @return
	 */
	public static String currentDatetime() {
		return DATE_TIME_SDF.format(now());
	}

	/**
	 * 格式化日期时间
	 * 日期时间格式yyyy-MM-dd HH:mm:ss
	 *
	 * @return
	 */
	public static String formatDatetime(Date date) {
		return DATE_TIME_SDF.format(date);
	}

	/**
	 * 格式化当前日期
	 * 日期时间格式yyyyMMddHHmmss
	 * @return
	 */
	public static String formatDatetime() {
		return YYYYMMDDHHMMSS_SDF.format(now());
	}

	/**
	 * 格式化日期时间
	 *
	 * @param date
	 * @param pattern 格式化模式
	 * @return
	 */
	public static String formatDatetime(Date date, String pattern) {
		SimpleDateFormat customFormat = new SimpleDateFormat(pattern);
		return customFormat.format(date);
	}

	/**
	 * 获得当前日期
	 * 日期格式yyyy-MM-dd
	 *
	 * @return
	 */
	public static String currentDate() {
		return DATE_SDF.format(now());
	}

	/**
	 * 格式化日期
	 * <p/>
	 * 日期格式yyyy-MM-dd
	 *
	 * @return
	 */
	public static String formatDate(Date date) {
		return DATE_SDF.format(date);
	}

	/**
	 * 获得当前时间
	 * <p/>
	 * 时间格式HH:mm:ss
	 *
	 * @return
	 */
	public static String currentTime() {
		return TIME_SDF.format(now());
	}

	/**
	 * 格式化时间
	 * <p/>
	 * 时间格式HH:mm:ss
	 *
	 * @return
	 */
	public static String formatTime(Date date) {
		return TIME_SDF.format(date);
	}

	/**
	 * 获得当前时间
	 * @return
	 */
	public static Date now() {
		return new Date();
	}

	public static Calendar calendar() {
		Calendar cal = GregorianCalendar.getInstance(Locale.CHINESE);
		cal.setFirstDayOfWeek(Calendar.MONDAY);
		return cal;
	}

	/**
	 * 获得当前时间的毫秒数
	 *
	 * @return
	 */
	public static long millis() {
		return System.currentTimeMillis();
	}

	/**
	 * 获得当前月份
	 *
	 * @return
	 */
	public static int month() {
		return calendar().get(Calendar.MONTH) + 1;
	}

	/**
	 * 获得月份中的第几天
	 *
	 * @return
	 */
	public static int dayOfMonth() {
		return calendar().get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 今天是星期的第几天
	 *
	 * @return
	 */
	public static int dayOfWeek() {
		return calendar().get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * 今天是年中的第几天
	 *
	 * @return
	 */
	public static int dayOfYear() {
		return calendar().get(Calendar.DAY_OF_YEAR);
	}

	/**
	 * 判断原日期是否在目标日期之前
	 *
	 * @param src
	 * @param dst
	 * @return
	 */
	public static boolean isBefore(Date src, Date dst) {
		return src.before(dst);
	}

	/**
	 * 判断原日期是否在目标日期之后
	 *
	 * @param src
	 * @param dst
	 * @return
	 */
	public static boolean isAfter(Date src, Date dst) {
		return src.after(dst);
	}

	/**
	 * 判断两日期是否相同
	 *
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static boolean isEqual(Date date1, Date date2) {
		return date1.compareTo(date2) == 0;
	}

	/**
	 * 判断某个日期是否在某个日期范围
	 *
	 * @param beginDate 日期范围开始
	 * @param endDate   日期范围结束
	 * @param src       需要判断的日期
	 * @return
	 */
	public static boolean between(Date beginDate, Date endDate, Date src) {
		return beginDate.before(src) && endDate.after(src);
	}

	/**
	 * 获得当前月的最后一天
	 * <p/>
	 * HH:mm:ss为0，毫秒为999
	 * @return
	 */
	public static Date lastDayOfMonth() {
		Calendar cal = calendar();
		cal.set(Calendar.DAY_OF_MONTH, 0); // M月置零
		cal.set(Calendar.HOUR_OF_DAY, 0);// H置零
		cal.set(Calendar.MINUTE, 0);// m置零
		cal.set(Calendar.SECOND, 0);// s置零
		cal.set(Calendar.MILLISECOND, 0);// S置零
		cal.set(Calendar.MONTH, cal.get(Calendar.MONTH) + 1);// 月份+1
		cal.set(Calendar.MILLISECOND, -1);// 毫秒-1
		return cal.getTime();
	}

	/**
	 * 获得当前月的第一天
	 * <p/>
	 * HH:mm:ss SS为零
	 * @return
	 */
	public static Date firstDayOfMonth() {
		Calendar cal = calendar();
		cal.set(Calendar.DAY_OF_MONTH, 1); // M月置1
		cal.set(Calendar.HOUR_OF_DAY, 0);// H置零
		cal.set(Calendar.MINUTE, 0);// m置零
		cal.set(Calendar.SECOND, 0);// s置零
		cal.set(Calendar.MILLISECOND, 0);// S置零
		return cal.getTime();
	}

	/**
	 * 获取周几日期
	 * @param week
	 * @return
	 */
	public static Date weekDay(int week) {
		Calendar cal = calendar();
		cal.set(Calendar.DAY_OF_WEEK, week);
		return cal.getTime();
	}

	/**
	 * 获得周五日期
	 * <p/>
	 * 注：日历工厂方法{@link #calendar()}设置类每个星期的第一天为Monday，US等每星期第一天为sunday
	 *
	 * @return
	 */
	public static Date friday() {
		return weekDay(Calendar.FRIDAY);
	}

	/**
	 * 获得周六日期
	 * <p/>
	 * 注：日历工厂方法{@link #calendar()}设置类每个星期的第一天为Monday，US等每星期第一天为sunday
	 *
	 * @return
	 */
	public static Date saturday() {
		return weekDay(Calendar.SATURDAY);
	}

	/**
	 * 获得周日日期
	 * <p/>
	 * 注：日历工厂方法{@link #calendar()}设置类每个星期的第一天为Monday，US等每星期第一天为sunday
	 *
	 * @return
	 */
	public static Date sunday() {
		return weekDay(Calendar.SUNDAY);
	}

	/**
	 * 将字符串日期时间转换成java.util.Date类型
	 * <p/>
	 * 日期时间格式yyyy-MM-dd HH:mm:ss
	 *
	 * @param datetime
	 * @return
	 */
	public static Date parseDatetime(String datetime) {
		try {
			return DATE_TIME_SDF.parse(datetime);
		} catch (ParseException e) {
			log.error("error exception", e);
			return null;
		}
	}

	/**
	 * 将字符串日期转换成java.util.Date类型
	 * 日期时间格式yyyy-MM-dd
	 *
	 * @param date
	 * @return
	 */
	public static Date parseDate(String date) {
		try {
			return DATE_SDF.parse(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 将字符串日期转换成java.util.Date类型
	 * 时间格式 HH:mm:ss
	 *
	 * @param time
	 * @return
	 */
	public static Date parseTime(String time) {
		try {
			return TIME_SDF.parse(time);
		} catch (ParseException e) {
			log.error("error exception", e);
			return null;
		}
	}

	/**
	 * 根据自定义pattern将字符串日期转换成java.util.Date类型
	 *
	 * @param datetime
	 * @return
	 */
	public static Date parseDatetime(String datetime, String pattern) {
		SimpleDateFormat customFormat = new SimpleDateFormat(pattern);
		try {
			return customFormat.parse(datetime);
		} catch (ParseException e) {
			log.error("error exception", e);
			return null;
		}
	}

	/**
	 * 获取当前系统时间
	 * <p/>
	 * 自定义格式
	 *
	 * @param pattern
	 * @return
	 * @throws java.text.ParseException
	 */
	public static String currDate(String pattern) throws ParseException {
		return formatDatetime(new Date(), pattern);
	}

	public static Long convertString2Long(String date, String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		try {
			return format.parse(date).getTime();
		} catch (Exception e) {
			log.error("error exception", e);
			return null;
		}
	}

	public static String convertLong2String(Long date, String pattern) {
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		try {
			return format.format(new Date(date));
		} catch (Exception e) {
			log.error("error exception", e);
			return null;
		}
	}

	/**
	 * 增加1天
	 *
	 * @param dt
	 * @return
	 * @throws Exception
	 */
	public static String addOneDay(String dt) throws Exception {
		return addOneDay(dt, "yyyy-MM-dd");
	}

	/**
	 * 增加1天
	 *
	 * @param dt
	 * @param ptn
	 * @return
	 * @throws Exception
	 */
	public static String addOneDay(String dt, String ptn) throws Exception {
		Date date = (new SimpleDateFormat(ptn)).parse(dt);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, 1);
		return (new SimpleDateFormat(ptn)).format(cal.getTime());
	}

	/**
	 * 减少1天
	 *
	 * @param dt
	 * @return
	 * @throws Exception
	 */
	public static String subOneDay(String dt) throws Exception {
		return subOneDay(dt, "yyyy-MM-dd");
	}

	/**
	 * 减少1天
	 *
	 * @param dt
	 * @param ptn
	 * @return
	 * @throws Exception
	 */
	public static String subOneDay(String dt, String ptn) throws Exception {
		Date date = (new SimpleDateFormat(ptn)).parse(dt);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DATE, -1);
		return (new SimpleDateFormat(ptn)).format(cal.getTime());
	}

	/**
	 * 日期加减操作
	 *
	 * @param currentDate 当前日期
	 * @param days
	 * @return
	 */
	public static String getSpecifiedDayBefore(String currentDate, int days) {
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = new SimpleDateFormat("yyyy-MM-dd").parse(currentDate);
		} catch (ParseException e) {
			log.error("error exception", e);
		}
		c.setTime(date);
		int day = c.get(Calendar.DATE);
		c.set(Calendar.DATE, day + days);

		String dayBefore = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
		return dayBefore;
	}

	// 指定模式的时间格式
	private static SimpleDateFormat getSDFormat(String pattern) {
		return new SimpleDateFormat(pattern);
	}

	/**
	 * 当前日历
	 * @return 以当地时区表示的系统当前日历
	 */
	public static Calendar getCalendar() {
		return Calendar.getInstance();
	}

	/**
	 * 指定毫秒数表示的日历
	 *
	 * @param millis 毫秒数
	 * @return 指定毫秒数表示的日历
	 */
	public static Calendar getCalendar(long millis) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(millis));
		return cal;
	}
	/**
	 * 时间转字符串
	 * @return
	 */
	public static String date2SStr()
	{
		Date date=getDate();
		if (null == date) {
			return null;
		}
		return YYYYMMDD_SDF.format(date);
	}

	/**
	 * 当前日期
	 *
	 * @return 系统当前时间
	 */
	public static Date getDate() {
		return new Date();
	}

	/**
	 * 指定毫秒数表示的日期
	 *
	 * @param millis
	 *            毫秒数
	 * @return 指定毫秒数表示的日期
	 */
	public static Date getDate(long millis) {
		return new Date(millis);
	}

	/**
	 * 时间戳转换为字符串
	 *
	 * @param time
	 * @return
	 */
	public static String timestamptoStr(Timestamp time) {
		Date date = null;
		if (null != time) {
			date = new Date(time.getTime());
		}
		return date2Str(DATE_SDF);
	}

	/**
	 * 字符串转换时间戳
	 *
	 * @param str
	 * @return
	 */
	public static Timestamp str2Timestamp(String str) {
		Date date = str2Date(str, DATE_SDF);
		return new Timestamp(date.getTime());
	}
	/**
	 * 字符串转换成日期
	 * @param str
	 * @param sdf
	 * @return
	 */
	public static Date str2Date(String str, SimpleDateFormat sdf) {
		if (null == str || "".equals(str)) {
			return null;
		}
		Date date = null;
		try {
			date = sdf.parse(str);
			return date;
		} catch (ParseException e) {
			log.error("error exception", e);
		}
		return null;
	}

	/**
	 * 当前日期转换为字符串
	 *
	 * @param dateFormat
	 * @return 字符串
	 */
	public static String date2Str(SimpleDateFormat dateFormat) {
		Date date=getDate();
		if (null == date) {
			return null;
		}
		return dateFormat.format(date);
	}
	/**
	 * 格式化时间
	 * @param data
	 * @param format
	 * @return
	 */
	public static String dataformat(String data,String format)
	{
		SimpleDateFormat sformat = new SimpleDateFormat(format);
		Date date=null;
		try {
			date=sformat.parse(data);
		} catch (ParseException e) {
			log.error("error exception", e);
		}
		return sformat.format(date);
	}
	/**
	 * 日期转换为字符串
	 *
	 * @param date
	 *            日期
	 * @param dateFormat
	 *            日期格式
	 * @return 字符串
	 */
	public static String date2Str(Date date, SimpleDateFormat dateFormat) {
		if (null == date) {
			return null;
		}
		return dateFormat.format(date);
	}
	/**
	 * 日期转换为字符串
	 *
	 * @param format
	 *            日期格式
	 * @return 字符串
	 */
	public static String getDate(String format) {
		Date date=new Date();
		if (null == date) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	/**
	 * 指定毫秒数的时间戳
	 *
	 * @param millis
	 *            毫秒数
	 * @return 指定毫秒数的时间戳
	 */
	public static Timestamp getTimestamp(long millis) {
		return new Timestamp(millis);
	}

	/**
	 * 以字符形式表示的时间戳
	 *
	 * @param time
	 *            毫秒数
	 * @return 以字符形式表示的时间戳
	 */
	public static Timestamp getTimestamp(String time) {
		return new Timestamp(Long.parseLong(time));
	}

	/**
	 * 系统当前的时间戳
	 *
	 * @return 系统当前的时间戳
	 */
	public static Timestamp getTimestamp() {
		return new Timestamp(new Date().getTime());
	}

	/**
	 * 指定日期的时间戳
	 *
	 * @param date
	 *            指定日期
	 * @return 指定日期的时间戳
	 */
	public static Timestamp getTimestamp(Date date) {
		return new Timestamp(date.getTime());
	}

	/**
	 * 指定日历的时间戳
	 *
	 * @param cal
	 *            指定日历
	 * @return 指定日历的时间戳
	 */
	public static Timestamp getCalendarTimestamp(Calendar cal) {
		return new Timestamp(cal.getTime().getTime());
	}

	public static Timestamp gettimestamp() {
		Date dt = new Date();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowTime = df.format(dt);
		Timestamp buydate = Timestamp.valueOf(nowTime);
		return buydate;
	}

	// ////////////////////////////////////////////////////////////////////////////
	// getMillis
	// 各种方式获取的Millis
	// ////////////////////////////////////////////////////////////////////////////

	/**
	 * 系统时间的毫秒数
	 *
	 * @return 系统时间的毫秒数
	 */
	public static long getMillis() {
		return new Date().getTime();
	}

	/**
	 * 指定日历的毫秒数
	 *
	 * @param cal
	 *            指定日历
	 * @return 指定日历的毫秒数
	 */
	public static long getMillis(Calendar cal) {
		return cal.getTime().getTime();
	}

	/**
	 * 指定日期的毫秒数
	 *
	 * @param date
	 *            指定日期
	 * @return 指定日期的毫秒数
	 */
	public static long getMillis(Date date) {
		return date.getTime();
	}

	/**
	 * 指定时间戳的毫秒数
	 *
	 * @param ts
	 *            指定时间戳
	 * @return 指定时间戳的毫秒数
	 */
	public static long getMillis(Timestamp ts) {
		return ts.getTime();
	}

	// ////////////////////////////////////////////////////////////////////////////
	// formatDate
	// 将日期按照一定的格式转化为字符串
	// ////////////////////////////////////////////////////////////////////////////

	/**
	 * 默认方式表示的系统当前日期，具体格式：年-月-日
	 *
	 * @return 默认日期按“年-月-日“格式显示
	 */
	public static String formatDate() {
		return DATE_SDF.format(getCalendar().getTime());
	}
	/**
	 * 获取时间字符串
	 */
	public static String getDataString(SimpleDateFormat formatstr) {
		return formatstr.format(getCalendar().getTime());
	}
	/**
	 * 指定日期的默认显示，具体格式：年-月-日
	 *
	 * @param cal
	 *            指定的日期
	 * @return 指定日期按“年-月-日“格式显示
	 */
	public static String formatDate(Calendar cal) {
		return DATE_SDF.format(cal.getTime());
	}

	/**
	 * 指定毫秒数表示日期的默认显示，具体格式：年-月-日
	 *
	 * @param millis
	 *            指定的毫秒数
	 * @return 指定毫秒数表示日期按“年-月-日“格式显示
	 */
	public static String formatDate(long millis) {
		return DATE_SDF.format(new Date(millis));
	}

	/**
	 * 默认日期按指定格式显示
	 *
	 * @param pattern
	 *            指定的格式
	 * @return 默认日期按指定格式显示
	 */
	public static String formatDate(String pattern) {
		return getSDFormat(pattern).format(getCalendar().getTime());
	}

	/**
	 * 指定日期按指定格式显示
	 *
	 * @param cal
	 *            指定的日期
	 * @param pattern
	 *            指定的格式
	 * @return 指定日期按指定格式显示
	 */
	public static String formatDate(Calendar cal, String pattern) {
		return getSDFormat(pattern).format(cal.getTime());
	}

	/**
	 * 指定日期按指定格式显示
	 *
	 * @param date
	 *            指定的日期
	 * @param pattern
	 *            指定的格式
	 * @return 指定日期按指定格式显示
	 */
	public static String formatDate(Date date, String pattern) {
		return getSDFormat(pattern).format(date);
	}

	// ////////////////////////////////////////////////////////////////////////////
	// formatTime
	// 将日期按照一定的格式转化为字符串
	// ////////////////////////////////////////////////////////////////////////////

	/**
	 * 默认方式表示的系统当前日期，具体格式：年-月-日 时：分
	 *
	 * @return 默认日期按“年-月-日 时：分“格式显示
	 */
	public static String formatTime() {
		return SHORT_DATE_TIME_SDF.format(getCalendar().getTime());
	}

	/**
	 * 指定毫秒数表示日期的默认显示，具体格式：年-月-日 时：分
	 *
	 * @param millis
	 *            指定的毫秒数
	 * @return 指定毫秒数表示日期按“年-月-日 时：分“格式显示
	 */
	public static String formatTime(long millis) {
		return SHORT_DATE_TIME_SDF.format(new Date(millis));
	}

	/**
	 * 指定日期的默认显示，具体格式：年-月-日 时：分
	 *
	 * @param cal
	 *            指定的日期
	 * @return 指定日期按“年-月-日 时：分“格式显示
	 */
	public static String formatTime(Calendar cal) {
		return SHORT_DATE_TIME_SDF.format(cal.getTime());
	}

	/**
	 * 默认方式表示的系统当前日期，具体格式：时：分
	 *
	 * @return 默认日期按“时：分“格式显示
	 */
	public static String formatShortTime() {
		return SHORT_TIME_SDF.format(getCalendar().getTime());
	}

	/**
	 * 指定毫秒数表示日期的默认显示，具体格式：时：分
	 *
	 * @param millis
	 *            指定的毫秒数
	 * @return 指定毫秒数表示日期按“时：分“格式显示
	 */
	public static String formatShortTime(long millis) {
		return SHORT_TIME_SDF.format(new Date(millis));
	}

	/**
	 * 指定日期的默认显示，具体格式：时：分
	 *
	 * @param cal
	 *            指定的日期
	 * @return 指定日期按“时：分“格式显示
	 */
	public static String formatShortTime(Calendar cal) {
		return SHORT_TIME_SDF.format(cal.getTime());
	}

	/**
	 * 指定日期的默认显示，具体格式：时：分
	 *
	 * @param date
	 *            指定的日期
	 * @return 指定日期按“时：分“格式显示
	 */
	public static String formatShortTime(Date date) {
		return SHORT_TIME_SDF.format(date);
	}

	// ////////////////////////////////////////////////////////////////////////////
	// parseDate
	// parseCalendar
	// parseTimestamp
	// 将字符串按照一定的格式转化为日期或时间
	// ////////////////////////////////////////////////////////////////////////////

	/**
	 * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
	 *
	 * @param src
	 *            将要转换的原始字符窜
	 * @param pattern
	 *            转换的匹配格式
	 * @return 如果转换成功则返回转换后的日期
	 */
	public static Date parseDate(String src, String pattern) {
		try {
			return getSDFormat(pattern).parse(src);
		} catch (ParseException e) {
			log.error("error exception", e);
			return null;
		}
	}

	/**
	 * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
	 *
	 * @param src
	 *            将要转换的原始字符窜
	 * @param pattern
	 *            转换的匹配格式
	 * @return 如果转换成功则返回转换后的日期
	 */
	public static Calendar parseCalendar(String src, String pattern) {
		Date date = parseDate(src, pattern);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal;
	}

	public static String formatAddDate(String src, String pattern, int amount) {
		Calendar cal;
		cal = parseCalendar(src, pattern);
		cal.add(Calendar.DATE, amount);
		return formatDate(cal);
	}

	/**
	 * 根据指定的格式将字符串转换成Date 如输入：2003-11-19 11:20:20将按照这个转成时间
	 *
	 * @param src
	 *            将要转换的原始字符窜
	 * @param pattern
	 *            转换的匹配格式
	 * @return 如果转换成功则返回转换后的时间戳
	 * @throws java.text.ParseException
	 */
	public static Timestamp parseTimestamp(String src, String pattern) {
		Date date = parseDate(src, pattern);
		return new Timestamp(date.getTime());
	}

	/**
	 * 计算两个时间之间的差值，根据标志的不同而不同
	 *
	 * @param flag
	 *            计算标志，表示按照年/月/日/时/分/秒等计算
	 * @param calSrc
	 *            减数
	 * @param calDes
	 *            被减数
	 * @return 两个日期之间的差值
	 */
	public static int dateDiff(char flag, Calendar calSrc, Calendar calDes) {

		long millisDiff = getMillis(calSrc) - getMillis(calDes);

		if (flag == 'y') {
			return (calSrc.get(calSrc.YEAR) - calDes.get(calDes.YEAR));
		}

		if (flag == 'd') {
			return (int) (millisDiff / DAY_IN_MILLIS);
		}

		if (flag == 'h') {
			return (int) (millisDiff / HOUR_IN_MILLIS);
		}

		if (flag == 'm') {
			return (int) (millisDiff / MINUTE_IN_MILLIS);
		}

		if (flag == 's') {
			return (int) (millisDiff / SECOND_IN_MILLIS);
		}

		return 0;
	}

	public static int getYear(){
		GregorianCalendar calendar=new GregorianCalendar();
		calendar.setTime(getDate());
		return calendar.get(Calendar.YEAR);
	}
}
