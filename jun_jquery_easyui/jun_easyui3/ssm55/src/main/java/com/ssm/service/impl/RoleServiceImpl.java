package com.ssm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssm.common.baseservice.BaseService;
import com.ssm.common.mybatis.Page;
import com.ssm.entity.Role;
import com.ssm.entity.RoleCriteria;
import com.ssm.mapper.RoleMapper;
import com.ssm.service.RolePermissionService;
import com.ssm.service.RoleService;

@Service("roleService")
public class RoleServiceImpl extends BaseService implements RoleService {
	
	@Autowired
	private RolePermissionService rolePermissionService;
	
	@Override
	public void delete(Long id) {
		baseDao.getMapper(RoleMapper.class).deleteByPrimaryKey(id);
//		shiroRealm.clearAllCachedAuthorizationInfo();
	}

	@Override
	public List<Role> find(Page page, String name) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<Role> findAll(){
		RoleCriteria criteria = new RoleCriteria();
		return baseDao.getMapper(RoleMapper.class).selectByExample(criteria);
	}

	@Override
	public Role get(Long id) {
		Role role = baseDao.getMapper(RoleMapper.class).selectByPrimaryKey(id);
		if(role != null){
			role.setRolePermissions(rolePermissionService.findByRoleId(role.getId()));
		}
		return role;
	}

	@Override
	public void save(Role role) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Role role) {
		// TODO Auto-generated method stub

	}

}
