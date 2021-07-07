package com.sgl.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sgl.dao.MenuDaoI;
import com.sgl.model.Menu;
@Repository("menuDao")
public class MenuDaoImpl implements MenuDaoI {

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@SuppressWarnings("unchecked")
	public List<Menu> getMenu(String hql) {
		return	this.sessionFactory.getCurrentSession().createQuery(hql).list();
	}

}
