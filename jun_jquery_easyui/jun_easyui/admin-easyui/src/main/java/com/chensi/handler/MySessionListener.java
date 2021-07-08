package com.chensi.handler;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.SessionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MySessionListener implements SessionListener {

	private static final Logger logger = LoggerFactory.getLogger(MySessionListener.class);

	/**
	 * 会话过期，注销socket
	 */
	@Override
	public void onExpiration(Session session) {
		logger.info("会话{}已过期", session.getId());
	}

	@Override
	public void onStart(Session session) {
		logger.info("会话{}已开始", session.getId());
	}

	@Override
	public void onStop(Session session) {
		logger.info("会话{}已停止", session.getId());
	}

}
