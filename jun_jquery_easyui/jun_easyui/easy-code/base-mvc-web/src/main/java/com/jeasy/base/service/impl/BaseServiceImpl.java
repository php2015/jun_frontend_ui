package com.jeasy.base.service.impl;

import com.jeasy.base.dao.BaseDAO;
import com.jeasy.base.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * BaseServiceImpl
 * @param <T>
 *     DAO
 * @param <E>
 *     Model
 *
 * @author taomk
 * @version 1.0
 * @since 2015/05/13 17:34
 */
@Slf4j
public class BaseServiceImpl<T extends BaseDAO<E>, E> implements BaseService<E> {

	@Autowired
	private T dao;

	@Override
	public List<E> find(Map<String, Object> params) {
		return dao.selectByParams(params);
	}

	@Override
	public E getById(Long id) {
		return dao.selectByPrimaryKey(id);
	}

	@Override
	public List<E> findByIds(List<Long> ids) {
		return dao.selectBatchByPrimaryKey(ids);
	}

	@Override
	public List<E> page(Map<String, Object> params, Integer offset, Integer size) {
		params.put("offset", offset);
		params.put("size", size);
		return dao.selectByParams(params);
	}

    @Override
    public Integer count(Map<String, Object> params) {
		return dao.countByParams(params);
    }

	@Override
	public E getFirst(Map<String, Object> params) {
		return dao.selectFirstByParams(params);
	}

	@Override
	public Long save(E entity) {
		return dao.insert(entity);
	}

	@Override
	public Integer saveBatch(List<E> entityList) {
		return dao.insertBatch(entityList);
	}

    @Override
    public Long saveSelective(E entity) {
    	return dao.insertSelective(entity);
    }

	@Override
	public Integer modify(E entity) {
		return dao.updateByPrimaryKey(entity);
	}

    @Override
    public Integer modifySelective(E entity) {
    	return dao.updateByPrimaryKeySelective(entity);
    }

	@Override
	public Integer remove(Long id) {
		return dao.deleteByPrimaryKey(id);
	}

	@Override
	public Integer removeBatch(List<Long> ids) {
		return dao.deleteBatchByPrimaryKey(ids);
	}

	@Override
	public Integer removeByParams(Map<String, Object> params) {
		return dao.deleteByParams(params);
	}
}