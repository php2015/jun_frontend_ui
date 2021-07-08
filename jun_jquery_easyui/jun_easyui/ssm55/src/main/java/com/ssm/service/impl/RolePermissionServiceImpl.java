package com.ssm.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssm.common.baseservice.BaseService;
import com.ssm.entity.RolePermission;
import com.ssm.entity.RolePermissionCriteria;
import com.ssm.mapper.RolePermissionMapper;
import com.ssm.service.PermissionService;
import com.ssm.service.RolePermissionDataControlService;
import com.ssm.service.RolePermissionService;

@Service("rolePermissionService")
public class RolePermissionServiceImpl extends BaseService implements RolePermissionService {

	@Autowired
	private PermissionService permissionService;
	
	@Autowired
	private RolePermissionDataControlService rolePermissionDataControlService;
	
	@Override
	public void delete(Long id) {
		baseDao.getMapper(RolePermissionMapper.class).deleteByPrimaryKey(id);
	}

	@Override
	public void delete(Iterable<RolePermission> entities) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<RolePermission> findByRoleId(Long roleId) {
		RolePermissionCriteria criteria = new RolePermissionCriteria();
		RolePermissionCriteria.Criteria cri = criteria.createCriteria();
		if(roleId != null){
			cri.andRoleIdEqualTo(roleId);
		}
		List<RolePermission> list = new ArrayList<RolePermission>();
		list = baseDao.getMapper(RolePermissionMapper.class).selectByExample(criteria);
		for(RolePermission rp:list){
			if(rp.getPermissionId() != null){
				rp.setPermission(permissionService.get(rp.getPermissionId()));
				rp.setRolePermissionDataControls(rolePermissionDataControlService.findByRolePermissionId(rp.getPermissionId()));
			}
		}
		return list;
	}

	@Override
	public RolePermission get(Long id) {
		// TODO Auto-generated method stub
		return baseDao.getMapper(RolePermissionMapper.class).selectByPrimaryKey(id);
	}

	@Override
	public void save(RolePermission rolePermission) {
		baseDao.getMapper(RolePermissionMapper.class).insertSelective(rolePermission);

	}

	@Override
	public void save(Iterable<RolePermission> entities) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(RolePermission rolePermission) {
		baseDao.getMapper(RolePermissionMapper.class).updateByPrimaryKeySelective(rolePermission);

	}

}
