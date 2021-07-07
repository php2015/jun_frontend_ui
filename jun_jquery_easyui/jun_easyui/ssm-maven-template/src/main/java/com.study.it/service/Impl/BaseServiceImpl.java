package com.study.it.service.Impl;

import com.study.it.dao.BaseDao;
import com.study.it.entity.Cdt;
import com.study.it.entity.PageInfo;
import com.study.it.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

public class BaseServiceImpl<T,DAO extends BaseDao<T>> implements BaseService<T> {

	@Autowired
	protected DAO dao=null;
	
	@Override
	@Transactional
	public void add(T o) {
		dao.insert(o);
	}

	@Override
	@Transactional
	public int edit(T o) {
		return dao.update(o);
	}

	@Transactional
	@Override
	public int remove(Serializable id) {
		return dao.delete(id);
	}

	
	@Override
	public List<T> findAll() {
		return dao.selectAll();
	}

	@Override
	public T findById(Serializable id) {
		return dao.selectById(id);
	}

	@Override
	public T findOne(List<Cdt> cdts) {
		return dao.selectOne(cdts);
	}

	@Override
	public List<T> findList(List<Cdt> cdts) {
		return dao.selectList(cdts);
	}

	@Override
	public List<T> findPage(List<Cdt> cdts, int page, int row, String orderby) {
		return dao.selectPage(cdts,(page-1)*row,row,orderby);
	}

	@Override
	public int findRowCount(List<Cdt> cdts) {
	   return dao.selectRowCount(cdts);
	}

	@Override
	public PageInfo findPageInfo(List<Cdt> cdts, int page, int row, String orderby) {
		PageInfo info=new PageInfo();
		info.setRow(row);
		info.setPageIndex(page);
		info.setRow(this.findRowCount(cdts));
		info.setList(dao.selectPage(cdts, info.getStart(), row, orderby));
		return info;
	}

}
