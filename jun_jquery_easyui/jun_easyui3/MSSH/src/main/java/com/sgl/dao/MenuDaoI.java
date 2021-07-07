package com.sgl.dao;

import java.util.List;

import com.sgl.model.Menu;

public interface MenuDaoI {
	public List<Menu> getMenu(String hql);
}
