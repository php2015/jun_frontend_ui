package com.study.it.dao;

import com.study.it.entity.Cdt;
import org.apache.ibatis.annotations.Param;

import java.io.Serializable;
import java.util.List;

public interface BaseDao<T> {
	public void insert(@Param("o") T o);
	public int update(@Param("o") T o);
	public int delete(@Param("id") Serializable id);
	public T selectById(@Param("id") Serializable id);
	public List<T> selectAll();
	public T selectOne(@Param("cdts") List<Cdt> cdts);
	public List<T> selectList(@Param("cdts") List<Cdt> cdts);
	public List<T> selectPage(@Param("cdts") List<Cdt> cdts, @Param("start") int start, @Param("row") int row, @Param("orderby") String orderby);
	public int selectRowCount(@Param("cdts") List<Cdt> cdts);
	
	
	
	
}
