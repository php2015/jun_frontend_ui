package com.ssm.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.ssm.common.SecurityConstants;
import com.ssm.entity.Module;
import com.ssm.entity.Permission;
import com.ssm.service.ModuleService;
import com.ssm.service.UserService;
import com.ssm.shiro.SecurityUtils;
import com.ssm.shiro.ShiroUser;


/** 
 * @description: 后台主页
 * @version 1.0
 * @author Kool Zhao
 * @createDate 2014-1-19;下午05:49:53
 */
@Controller
@RequestMapping("/management/index")
public class IndexController {

	private static final String INDEX = "management/index/index";
	private static final String NORTH = "management/index/north";
	private static final String SOUTH = "management/index/south";
	private static final String CENTER = "management/index/center";
	private static final String PORTAL = "management/index/portal";
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModuleService moduleService;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public String index(HttpServletRequest request) {
		
		ShiroUser shiroUser = SecurityUtils.getShiroUser();
		// 加入ipAddress
		shiroUser.setIpAddress(request.getRemoteAddr());
		
		request.getSession().setAttribute(SecurityConstants.LOGIN_USER, shiroUser.getUser());
		
		return INDEX;
	}
	
	@RequestMapping(value="/getMenuModule", method=RequestMethod.POST) 
	@ResponseBody
	public Module getMenuModule() {
		
		Subject subject = SecurityUtils.getSubject();
		
		Module rootModule = moduleService.getTree();

		if(rootModule != null){
			check(rootModule, subject);
		}else{
			rootModule = new Module();
		}
		
		return rootModule;
	}
	
	private void check(Module module, Subject subject) {
		List<Module> list1 = Lists.newArrayList();
		for (Module m1 : module.getChildren()) {
			// 只加入拥有view权限的Module
			if (subject.isPermitted(m1.getSn() + ":"
					+ Permission.PERMISSION_SHOW)) {
				check(m1, subject);
				list1.add(m1);
			}
		}
		module.setChildren(list1);
	}
	
	@RequestMapping(value="portal", method=RequestMethod.GET)
	public String portal(HttpServletRequest request) {
		
		return PORTAL;
	}
}
