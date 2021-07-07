package com.chensi.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 定时任务
 * @author chensi
 * @version 2016-9-3 下午8:31:58
 */
public class MyJob {

	private static final Logger logger = LoggerFactory.getLogger(MyJob.class);

	public void testJob() {
		logger.info("定时任务{}正在执行...","MyJob.testJob()");
	}
}
