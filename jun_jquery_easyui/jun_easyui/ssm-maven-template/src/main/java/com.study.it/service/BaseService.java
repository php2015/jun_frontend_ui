package com.study.it.service;

import com.study.it.entity.Cdt;
import com.study.it.entity.PageInfo;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T> {
	public void add(T o);
	public int edit(T o);
	public int remove(Serializable id);
	public List<T> findAll();
	public T findById(Serializable id);
	
	public T findOne(List<Cdt> cdts);
	public List<T> findList(List<Cdt> cdts);
	public List<T> findPage(List<Cdt> cdts, int page, int row, String orderby);
	public PageInfo findPageInfo(List<Cdt> cdts, int page, int row, String orderby);
	public int findRowCount(List<Cdt> cdts);
   
}




