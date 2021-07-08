package com.ssm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.common.baseaction.BaseAction;
import com.ssm.common.mybatis.Page;
import com.ssm.entity.User;
import com.ssm.service.OrganizationService;
import com.ssm.service.RoleService;
import com.ssm.service.UserRoleService;
import com.ssm.service.UserService;
import com.ssm.viewModel.GridModel;


@Controller
@RequestMapping("/management/security/user")
public class UserController extends BaseAction{

	private static final String LIST = "management/security/user/list";
	
	@Autowired
	private UserService userService;
	
	@Autowired
	UserRoleService userRoleService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private OrganizationService organizationService;
	
	@RequestMapping(value="")
	public String index(){
		return LIST;
	}
	
	@RequestMapping(value="/list")
	@ResponseBody
	public GridModel list(){
		User user = form(User.class);
		Page info = userService.findByPage(page(), user);
		GridModel m = new GridModel();
		m.setRows(info.getRows());
		m.setTotal(info.getCount());
		return m;
	}
}
