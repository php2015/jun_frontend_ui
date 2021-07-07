package com.jacarrichan.demo.common.mapper;

import java.io.Serializable;
import java.util.List;

import com.jacarrichan.demo.common.service.query.BaseQuery;

public interface BaseMapper<T extends Serializable, PK> {
	int deleteByPrimaryKey(PK id);

	int insert(T record);

	int insertSelective(T record);

	T selectByPrimaryKey(PK id);

	int updateByPrimaryKeySelective(T record);

	int updateByPrimaryKey(T record);

	List<T> selectByQuery(BaseQuery query);
}
