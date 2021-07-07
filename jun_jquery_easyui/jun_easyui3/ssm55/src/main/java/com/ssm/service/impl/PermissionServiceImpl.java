package com.ssm.service.impl;


import org.springframework.stereotype.Service;

import com.ssm.common.baseservice.BaseService;
import com.ssm.entity.Permission;
import com.ssm.mapper.ModuleMapper;
import com.ssm.mapper.PermissionMapper;
import com.ssm.service.PermissionService;

@Service("permissionService")
public class PermissionServiceImpl extends BaseService implements PermissionService {

	@Override
	public void delete(Long id) {
		baseDao.getMapper(PermissionMapper.class).deleteByPrimaryKey(id);
	}

	@Override
	public Permission get(Long id) {
		Permission p = baseDao.getMapper(PermissionMapper.class).selectByPrimaryKey(id);
		if(p != null && p.getModuleId() != null){
			p.setModule(baseDao.getMapper(ModuleMapper.class).selectByPrimaryKey(p.getModuleId()));
		}
		return p;
	}

	@Override
	public void save(Permission permission) {
		baseDao.getMapper(PermissionMapper.class).insertSelective(permission);

	}

	@Override
	public void update(Permission permission) {
		baseDao.getMapper(PermissionMapper.class).updateByPrimaryKeySelective(permission);

	}

}
