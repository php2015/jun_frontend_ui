package com.chensi.service.impl;

import java.io.Serializable;
import java.util.List;

import com.chensi.common.GridModel;
import com.chensi.common.Page;
import com.chensi.common.Pager;
import com.chensi.dao.CommonMapper;

/**
 * 公共服务类
 * @author Chason
 * @version 2016-6-15 下午7:37:12
 */
public class CommonService<T> {
	/** 默认的Mapper映射 */
	protected CommonMapper<T> mapper;

	/**
	 * 初始化方法, 将子类的mapper赋值给当前对象的mapper
	 */
	protected void init() {
	}

	/**
	 * 获取数据列表(分页)
	 * @return 数据列表
	 */
	public Pager page(Pager pager) {
		if (this.mapper == null) {
			init();
		}
		Page page=new Page((pager.getPageNo()-1)*pager.getPageSize(),pager.getPageSize());
		Integer count=mapper.count();
		List list=mapper.list(page);
		return new Pager(pager.getPageNo(), pager.getPageSize(), list, count);
	}
	
	/**
	 * 返回easyui datagrid格式数据
	 * @param pager
	 * @return
	 */
	public GridModel pageGrid(Pager pager){
		Pager res=page(pager);
		GridModel gridModel=new GridModel();
		gridModel.setRows(res.getList());
		gridModel.setTotal((long)res.getTotalRow());
		return gridModel;
	}

	/**
	 * 列出所有数据列表(分页)
	 * @param entity 查询条件
	 * @param page 分页条件(可为空)
	 * @return 所有数据列表
	 */
	public Pager pageByEntity(T entity, Pager pager) {
		if (this.mapper == null) {
			init();
		}
		Page page=new Page((pager.getPageNo()-1)*pager.getPageSize(),pager.getPageSize());
		Integer count=mapper.countByEntity(entity);
		List list=mapper.listByEntity(entity,page);
		return new Pager(pager.getPageNo(), pager.getPageSize(), list, count);
	}
	
	/**
	 * 返回easyui datagrid格式数据
	 * @param entity
	 * @param pager
	 * @return
	 */
	public GridModel pageGridByEntity(T entity, Pager pager){
		Pager res=pageByEntity(entity,pager);
		GridModel gridModel=new GridModel();
		gridModel.setRows(res.getList());
		gridModel.setTotal((long)res.getTotalRow());
		return gridModel;
	}
	
	/**
	 * 获取数据列表(不分页)
	 * @return 数据列表
	 */
	public List<T> list() {
		if (this.mapper == null) {
			init();
		}
		return mapper.list(null);
	}
	
	/**
	 * 列出所有数据列表(不分页)
	 * @param entity 查询条件
	 * @return 所有数据列表
	 */
	public List<T> listByEntity(T entity) {
		if (this.mapper == null) {
			init();
		}
		return mapper.listByEntity(entity,null);
	}

	/**
	 * 获取数据总数
	 * @return 数据总数
	 */
	public Integer count() {
		if (this.mapper == null) {
			init();
		}
		return mapper.count();
	}

	/**
	 * 根据entity获取数据总数
	 * @param entity 查询条件
	 * @return 数据总数
	 */
	public Integer countByEntity(T entity) {
		if (this.mapper == null) {
			init();
		}
		return mapper.countByEntity(entity);
	}

	/**
	 * 根据编号获取数据
	 * @param id 数据编号
	 * @return 数据详情
	 */
	public T get(Serializable id) {
		if (this.mapper == null) {
			init();
		}
		return mapper.get(id);
	}

	/**
	 * 根据数据对象的属性获取指定数据
	 * @param entity 对象形式的参数
	 * @return 指定数据
	 */
	public T getByEntity(T entity) {
		if (this.mapper == null) {
			init();
		}
		return mapper.getByEntity(entity);
	}
	
	/**
	 * 获取排序码最大值
	 * @return 排序码最大值
	 */
	public Integer getMaxSort(){
		if (this.mapper == null) {
			init();
		}
		return mapper.getMaxSort();
	}

	/**
	 * 保存指定数据到数据库
	 * @param entity 待保存数据
	 */
	public void save(T entity) {
		if (this.mapper == null) {
			init();
		}
		mapper.save(entity);
	}

	/**
	 * 批量保存数据
	 * @param entitys 待保存的批量数据
	 */
	public void saveAll(List<T> entitys) {
		if (this.mapper == null) {
			init();
		}
		mapper.saveAll(entitys);
	}

	/**
	 * 更新指定数据
	 * @param entity 待更新数据
	 */
	public void update(T entity) {
		if (this.mapper == null) {
			init();
		}
		mapper.update(entity);
	}

	/**
	 * 批量更新数据
	 * @param entitys 待更新的批量数据
	 */
	public void updateAll(List<T> entitys) {
		if (this.mapper == null) {
			init();
		}
		mapper.updateAll(entitys);
	}

	/**
	 * 根据ID删除指定数据
	 * @param id 待删除的ID
	 */
	public void remove(Serializable id) {
		if (this.mapper == null) {
			init();
		}
		mapper.remove(id);
	}

	/**
	 * 根据ID删除指定数据
	 * @param entity 待删除的对象(包含删除的条件)
	 */
	public void removeByEntity(T entity) {
		if (this.mapper == null) {
			init();
		}
		mapper.removeByEntity(entity);
	}

	/**
	 * 通过ID集合批量删除数据
	 * @param ids 待删除的数据ID集合
	 */
	public void removeAll(List<Integer> ids) {
		if (this.mapper == null) {
			init();
		}
		mapper.removeAll(ids);
	}

	/**
	 * 批量删除数据
	 * @param entitys 待删除的批量数据
	 */
	public void removeAllByEntity(List<T> entitys) {
		if (this.mapper == null) {
			init();
		}
		mapper.removeAllByEntity(entitys);
	}
}