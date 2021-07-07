package com.chensi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chensi.dao.RoleMenuMapper;
import com.chensi.model.RoleMenu;
import com.chensi.service.IRoleMenuService;
@Service
public class RoleMenuService extends CommonService<RoleMenu> implements IRoleMenuService{

	@Autowired
	private RoleMenuMapper roleMenuMapper;
	
	protected void init(){
		super.mapper=roleMenuMapper;
	}
}
