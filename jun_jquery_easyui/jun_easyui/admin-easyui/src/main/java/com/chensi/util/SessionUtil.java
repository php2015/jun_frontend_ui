package com.chensi.util;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.session.Session;

import com.chensi.common.Constants;
import com.chensi.common.LoginUser;

public class SessionUtil {

	/**
	 * 获取在线人数
	 * @param sessions
	 * @return
	 */
	public static int getOnlineCount(Collection<Session> sessions) {
		if (CommonUtil.isEmptyList(sessions)) {
			return 0;
		}
		Set<String> users = new HashSet<String>();
		for (Session s : sessions) {
			LoginUser u = (LoginUser) s.getAttribute(Constants.LOGIN_USER);
			if (u != null) {
				users.add(u.getUsername());
			}
		}
		return users.size();
	}
}
