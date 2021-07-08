package com.chensi.service;

import java.util.List;
import java.util.Set;

import com.chensi.model.Menu;
import com.chensi.model.Role;

public interface IRoleService extends ICommonService<Role>{

	List<Menu> listMyMenu(Integer id,Integer type);

	void savePermission(Integer id, List<Integer> menuIds);

	Set<String> listMyMenuCode(Integer roleId);

	Set<String> listAllMenuCode();

}
