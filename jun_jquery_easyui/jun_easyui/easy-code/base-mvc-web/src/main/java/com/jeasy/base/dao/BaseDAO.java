package com.jeasy.base.dao;

import java.util.List;
import java.util.Map;

/**
 * BaseDAO
 * @param <E>
 *     Model
 *
 * @author taomk
 * @version 1.0
 * @since 2015/05/13 17:34
 */
public interface BaseDAO<E> {

	/**
	 * 插入
	 */
	public Long insert(E entity);

	/**
	 * 批量插入
	 */
	public Integer insertBatch(List<E> entityList);

	/**
	 * 选择插入
	 */
	public Long insertSelective(E entity);

	/**
	 * 按主键ID, 查询
	 */
	public E selectByPrimaryKey(long id);

	/**
	 * 按主键ID, 批量查询
	 */
	public List<E> selectBatchByPrimaryKey(List<Long> ids);

	/**
	 * 按主键ID更新
	 */
	public Integer updateByPrimaryKey(E entity);

	/**
	 * 按主键ID选择更新
	 */
	public Integer updateByPrimaryKeySelective(E entity);

	/**
	 * 按参数查询
	 */
	public List<E> selectByParams(Map<String, Object> params);

	/**
	 * 按参数查询数量
	 */
    public Integer countByParams(Map<String, Object> params);

	/**
	 * 按参数查询第一个
	 */
	public E selectFirstByParams(Map<String, Object> params);

	/**
	 * 按主键ID删除
	 */
	public Integer deleteByPrimaryKey(long id);

	/**
	 * 按主键ID批量删除
	 */
	public Integer deleteBatchByPrimaryKey(List<Long> ids);

	/**
	 * 按参数批量删除
     */
	public Integer deleteByParams(Map<String, Object> params);
}