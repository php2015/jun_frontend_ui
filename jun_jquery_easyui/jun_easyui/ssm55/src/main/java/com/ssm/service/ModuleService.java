package com.ssm.service;

import java.util.List;

import com.ssm.common.mybatis.Page;
import com.ssm.entity.Module;
import com.ssm.exception.ExistedException;
import com.ssm.exception.ServiceException;


public interface ModuleService {

	void save(Module module) throws ExistedException;
	
	Module get(Long id);
	
	Module getBySn(String sn);
	
	void update(Module module);
	
	void delete(Long id) throws ServiceException;
	
	Module getTree();
	
	List<Module> findAll(String orderByClause);
	
	List<Module> find(Long parentId,String name, Page page);
	
	/**
	 * @param parentId 根据父类查询
	 * @return
	 */
	public List<Module> getModuleByParentId(Long parentId);
	
}
