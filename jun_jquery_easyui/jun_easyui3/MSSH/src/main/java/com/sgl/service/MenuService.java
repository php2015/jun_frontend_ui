package com.sgl.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sgl.dao.MenuDaoI;
import com.sgl.model.Menu;

@Service("menuService")
@Transactional
public class MenuService {

	private MenuDaoI menuDao;

	public MenuDaoI getMenuDao() {
		return menuDao;
	}

	@Autowired
	public void setMenuDao(MenuDaoI menuDao) {
		this.menuDao = menuDao;
	}

	public List<Menu> getMenu(String id) {
		String hql = null;
		if (id == null) {
			hql = "from Menu m where m.menu is null";
		} else {
			hql = "from Menu m where m.menu.id ='" + id + "'";
		}
		List<Menu> resMenus = new ArrayList<Menu>();
		List<Menu> menus = menuDao.getMenu(hql);
		if (menus!=null&&menus.size()>0) {
			for (Menu m : menus) {
				Menu menu =new Menu();
				BeanUtils.copyProperties(m, menu,new String[]{"menu","menus","url"});
				Map<String , Object > map = new HashMap<String, Object>();
				map.put("url",m.getUrl());
				menu.setAttributes(map);
				Set<Menu> set = m.getMenus();
				if (set != null && set.size() > 0) {
					menu.setState("closed");
				} else {
					menu.setState("open");
				}
				resMenus.add(menu);
			}
		}
		return resMenus;
	}
}
