package cn.javabb.sys.controller;

import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.constant.Constant;
import cn.javabb.common.model.R;
import cn.javabb.common.util.PasswordUtil;
import cn.javabb.sys.entity.User;
import cn.javabb.sys.service.UserService;

@Controller
@RequestMapping("/auth")
public class AuthController {

	private static final Logger log = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/login")
	public String login() {
		return "login";
	}
	/**
	 * 登陆
	 * @author QINB
	 * @param user
	 * @param session
	 * @return
	 */
	@Log("登录")
	@ResponseBody
	@PostMapping(value = "/toLogin")
	public R toLogin(User user, HttpSession session) {
		// shiro认证
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(user.getUserName(), PasswordUtil.md5(user.getUserPwd(),Constant.MD5_SALT));
		
		try {
			subject.login(token);
			//subject.getSession().setAttribute(Constant.SESSION_USER, userService.queryByUserName(user.getUserName()));
			//session.setAttribute("currentUser", userService.queryByUserName(user.getUserName()));
		} catch (UnknownAccountException e) {
			return R.ok(0, "账号或密码错误!");
		} catch (Exception e) {
			log.info("登陆异常", e);
			return R.error(1, "登陆失败");
		}
		return R.ok();
	}
	@Log("注销登录")
	@PostMapping("/logout")
	public String logout(){
		SecurityUtils.getSubject().logout();
		return "redirect:/auth/toLogin";
	}

}
