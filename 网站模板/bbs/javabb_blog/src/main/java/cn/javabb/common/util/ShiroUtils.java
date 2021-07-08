package cn.javabb.common.util;

import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

import cn.javabb.common.constant.Constant;
import cn.javabb.sys.entity.User;

public class ShiroUtils {
	@Autowired
	public static Subject getSubjct() {
		return SecurityUtils.getSubject();
	}
	public static User getUser() {
		User user = (User)getSubjct().getSession().getAttribute(Constant.SESSION_USER);
		if(BUtil.isNull(user)){
			return null;
		}
		return user;
	}
	public static void logout() {
		getSubjct().logout();
	}
}
