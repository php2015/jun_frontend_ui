package com.chensi.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.chensi.common.AjaxJson;
import com.chensi.common.Constants;
import com.chensi.common.Global;
import com.chensi.common.LoginUser;
import com.chensi.common.MenuModel;
import com.chensi.model.Menu;
import com.chensi.model.User;
import com.chensi.service.IMenuService;
import com.chensi.service.IRoleService;
import com.chensi.service.IUserService;
import com.chensi.util.CommonUtil;
import com.chensi.util.DateUtils;
import com.chensi.util.MD5Util;
import com.chensi.util.SessionUtil;
import com.google.code.kaptcha.Producer;

/**
 * 公共模块<br>
 * -------------------------------------------
 * 1.公共模块自定义后缀名，此处为了优雅性将暴露url的后缀都设为.html<br>
 * 2.视图模块无后缀名<br>
 * 3.管理后台ajax请求全部用.do<br>
 * -------------------------------------------
 * 
 * @author chensi
 * @version 2016-7-31 下午5:49:32
 */
@Controller
public class PublicController {

	private static final Logger logger = LoggerFactory.getLogger(PublicController.class);

	@Autowired
	private Producer captchaProducer;

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	@Autowired
	private IMenuService menuService;

	@Autowired
	private SessionDAO sessionDAO;

	/**
	 * 主页面
	 * 
	 * @return
	 */
	@RequestMapping("index.html")
	public ModelAndView index() {
		Map<String, Object> map = new HashMap<String, Object>();
		return new ModelAndView("index", map);
	}
	
	@RequestMapping("listMenu.do")
	@ResponseBody
	public AjaxJson listMenu(){
		Session session = SecurityUtils.getSubject().getSession();
		LoginUser tmp = (LoginUser) session.getAttribute(Constants.LOGIN_USER);
		List<Menu> list=new ArrayList<Menu>();
		User user = userService.get(tmp.getId());
		// 加载菜单
		if (user != null && user.getIsSuper() == Constants.USER_SUPER_Y) {
			Menu entity = new Menu();
			entity.setType(Constants.MENU_TYPE_MENU);
			list = menuService.listByEntity(entity);
		} else {
			list = roleService.listMyMenu(tmp.getRoleId(), Constants.MENU_TYPE_MENU);
		}
		List<MenuModel> parentList=new ArrayList<MenuModel>();
		for(Menu m:list){
			if(m.getParentId()==null){
				MenuModel menuModel=new MenuModel();
				menuModel.setName(m.getName());
				menuModel.setIconCls(m.getIcon());
				menuModel.setUrl(m.getUrl());
				List<MenuModel> childList=new ArrayList<MenuModel>();
				for(Menu m2:list)
				{
					MenuModel menuChildModel=new MenuModel();
					if(m.getId()==m2.getParentId())
					{
						menuChildModel.setName(m2.getName());
						menuChildModel.setIconCls(m2.getIcon());
						menuChildModel.setUrl(m2.getUrl());
						childList.add(menuChildModel);
					}
				}
				menuModel.setChild(childList);
				parentList.add(menuModel);
			}
		}
		return AjaxJson.getSuccessInfo(parentList);
	}

	/**
	 * 登录页面
	 * 
	 * @return
	 */
	@RequestMapping("login.html")
	public String login() {
		return "login";
	}
	
	@RequestMapping("center.html")
	public String center() {
		return "layout/center";
	}
	
	@RequestMapping("north.html")
	public String north() {
		return "layout/north";
	}
	
	@RequestMapping("south.html")
	public String south() {
		return "layout/south";
	}
	
	@RequestMapping("portal.html")
	public String portal() {
		return "layout/portal";
	}

	/**
	 * 欢迎页面
	 * 
	 * @return
	 */
	@RequestMapping("viewWelcome")
	public String viewWelcome() {
		return "user/welcome";
	}

	/**
	 * 登录
	 * 
	 * @param username
	 * @param passsword
	 * @param captcha
	 * @return
	 */
	@RequestMapping("login.do")
	@ResponseBody
	public AjaxJson login(String username, String password, Boolean remember) {
		if (!StringUtils.isNoneBlank(username, password)) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		Subject subject = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(username, MD5Util.GetMD5Code(password));
		if (remember != null && remember) {
			token.setRememberMe(true);
		}
		try {
			subject.login(token);
			logger.info("用户{}认证成功", username);
		} catch (AuthenticationException e) {
			logger.info("用户{}认证失败", username);
			token.clear();
			return AjaxJson.getWarnInfo(Constants.USER_ERROR);
		}
		// UnknownAccountException //用户名错误
		// IncorrectCredentialsException//密码错误
		// DisabledAccountException//帐号被禁用
		// LockedAccountException//帐号被锁定
		// ExcessiveAttemptsException//登录失败次数过多(结合ehcache设)
		// ExpiredCredentialsException//凭证过期
		Session session = subject.getSession();
		LoginUser loginUser = (LoginUser) session.getAttribute(Constants.LOGIN_USER);
		// 重置上次登录时间
		User user = userService.get(loginUser.getId());
		user.setLastTime(DateUtils.getNowTime());
		userService.update(user);
		// 在线人数
		Collection<Session> sessions = sessionDAO.getActiveSessions();
		logger.info("当前在线人数{}人", SessionUtil.getOnlineCount(sessions));
		return AjaxJson.getSuccessInfo(user);
	}

	/**
	 * 退出登录，清除认证信息
	 * 
	 * @return
	 */
	@RequestMapping("logout.do")
	@ResponseBody
	public AjaxJson logout() {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		return AjaxJson.getRedirectInfo();
	}

	/**
	 * 验证码校验
	 * 
	 * @param captcha
	 * @return
	 */
	@RequestMapping("checkCaptcha.do")
	@ResponseBody
	public AjaxJson checkCaptcha(String captcha) {
		if (!StringUtils.isNoneBlank(captcha)) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		// HttpSession session = WebUtil.getSession();
		// String capthcaTrue = (String)
		// session.getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		// if (!StringUtils.equals(captcha, capthcaTrue)) {
		// return AjaxJson.getWarnInfo(Constants.CAPTCHA_ERROR);
		// }
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 生成验证码
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("captcha")
	public String getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");
		String capText = captchaProducer.createText();
		session.setAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY, capText);
		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
		return null;
	}

	/**
	 * 上传接口（兼容所有浏览器）
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("upload.do")
	public void upload(HttpServletRequest request, HttpServletResponse response) {
		// 防止乱码
		response.setContentType(Constants.CONTENT_TYPE);
		try {
			if (!(request instanceof MultipartHttpServletRequest)) {
				printHtml(response, AjaxJson.getFailInfo("没有文件"));
			}
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
			String relativePath = Constants.UPLOAD_PATH + new SimpleDateFormat("yyyy/MM/dd").format(new Date());// uploadFiles/2016/06/17
			String ctxPath = request.getSession().getServletContext().getRealPath("/") + relativePath;// D:\apache-tomcat-7.0.57\webapps\maintenanceServer\
			File dir = new File(ctxPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			String fileName = null;
			StringBuffer sb = new StringBuffer();
			for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
				// 上传文件名 //
				MultipartFile mf = entity.getValue();
				fileName = mf.getOriginalFilename();
				if (StringUtils.isBlank(fileName)) {
					continue;
				}
				String format = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				fileName = "" + System.currentTimeMillis() + CommonUtil.getRandomNum(6);
				File uploadFile = new File(ctxPath + "/" + fileName + format);
				FileCopyUtils.copy(mf.getBytes(), uploadFile);
				sb.append(relativePath + "/" + fileName + format + ",");
			}
			if ("".equals(sb.toString())) {
				printHtml(response, AjaxJson.getFailInfo("没有文件"));
			}
			String result = sb.deleteCharAt(sb.lastIndexOf(",")).toString();
			logger.info("文件上传成功： " + result);
			printHtml(response, AjaxJson.getSuccessInfo(result));
		} catch (IOException e) {
			e.printStackTrace();
			logger.error("************上传文件失败************");
			try {
				printHtml(response, AjaxJson.getFailInfo());
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}

	private void printHtml(HttpServletResponse response, Object msg) throws IOException {
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter writer = response.getWriter();
		writer.write(Global.gson.toJson(msg));
		writer.close();
	}
}
