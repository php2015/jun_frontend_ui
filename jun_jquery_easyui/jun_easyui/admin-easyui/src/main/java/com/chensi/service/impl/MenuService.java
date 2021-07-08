package com.chensi.service.impl;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chensi.dao.MenuMapper;
import com.chensi.dao.RoleMenuMapper;
import com.chensi.model.Menu;
import com.chensi.model.RoleMenu;
import com.chensi.service.IMenuService;
@Service
public class MenuService extends CommonService<Menu> implements IMenuService{

	@Autowired
	private MenuMapper menuMapper;
	
	@Autowired
	private RoleMenuMapper roleMenuMapper;
	
	protected void init(){
		super.mapper=menuMapper;
	}

	@Override
	public void remove(Serializable id) {
		//删除关联表信息
		Integer menuId=(Integer) id;
		RoleMenu param=new RoleMenu();
		param.setMenuId(menuId);
		roleMenuMapper.removeByEntity(param);
		super.remove(id);
	}
	
	
}
