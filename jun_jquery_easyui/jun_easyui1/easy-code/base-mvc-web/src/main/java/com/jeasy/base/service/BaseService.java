package com.jeasy.base.service;

import java.util.List;
import java.util.Map;

/**
 * BaseService
 * @param <E>
 *     Model
 *
 * @author taomk
 * @version 1.0
 * @since 2015/05/13 17:34
 */
public interface BaseService<E> {

	/**
	 * 查询
	 */
	public List<E> find(Map<String, Object> params);

	/**
     * ID查询
     */
	public E getById(Long id);

	/**
	 * ID批量查询
	 */
	public List<E> findByIds(List<Long> ids);

	/**
	 * 参数分页查询
	 */
	public List<E> page(Map<String, Object> params, Integer offset, Integer size);

	/**
	 * 参数查询总数
	 */
	public Integer count(Map<String, Object> params);

	/**
	 * First查询
	 */
	public E getFirst(Map<String, Object> params);

	/**
	 * 保存
	 */
    public Long save(E entity);

	/**
	 * 批量保存
	 */
	public Integer saveBatch(List<E> entityList);

    /**
     * 选择保存
     */
    public Long saveSelective(E entity);

	/**
	 * 修改
	 */
	public Integer modify(E entity);

    /**
     * 选择修改
     */
    public Integer modifySelective(E entity);

	/**
	 * 删除
	 */
    public Integer remove(Long id);

	/**
	 * 批量删除
	 */
	public Integer removeBatch(List<Long> ids);

	/**
	 * 参数删除
	 */
	public Integer removeByParams(Map<String, Object> params);
}
