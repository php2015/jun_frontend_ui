package com.chensi.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chensi.dao.RoleMapper;
import com.chensi.dao.RoleMenuMapper;
import com.chensi.model.Menu;
import com.chensi.model.Role;
import com.chensi.model.RoleMenu;
import com.chensi.service.IRoleService;
import com.chensi.util.CommonUtil;

@Service
public class RoleService extends CommonService<Role> implements IRoleService {

	@Autowired
	private RoleMapper roleMapper;

	@Autowired
	private RoleMenuMapper roleMenuMapper;

	protected void init() {
		super.mapper = roleMapper;
	}

	@Override
	public void remove(Serializable id) {
		// 删除关联表信息
		Integer roleId = (Integer) id;
		RoleMenu param = new RoleMenu();
		param.setRoleId(roleId);
		roleMenuMapper.removeByEntity(param);
		super.remove(id);
	}

	/**
	 * 查询角色菜单
	 */
	@Override
	public List<Menu> listMyMenu(Integer id, Integer type) {
		return roleMapper.listMyMenu(id, type);
	}

	/**
	 * 先删除后插入
	 */
	@Override
	public void savePermission(Integer id, List<Integer> menuIds) {
		RoleMenu param = new RoleMenu();
		param.setRoleId(id);
		roleMenuMapper.removeByEntity(param);
		if (CommonUtil.isNotEmptyList(menuIds)) {
			roleMenuMapper.savePermission(id, menuIds);
		}
	}

	/**
	 * 查询角色权限code
	 */
	@Override
	public Set<String> listMyMenuCode(Integer roleId) {
		return roleMapper.listMyMenuCode(roleId);
	}

	/**
	 * 查询所有角色code
	 */
	@Override
	public Set<String> listAllMenuCode() {
		return roleMapper.listAllMenuCode();
	}

}
