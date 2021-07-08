package com.chensi.dao;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.chensi.model.Menu;
import com.chensi.model.Role;

public interface RoleMapper extends CommonMapper<Role> {

	List<Menu> listMyMenu(@Param("id") Integer id, @Param("type") Integer type);

	Set<String> listMyMenuCode(@Param("id")Integer roleId);

	Set<String> listAllMenuCode();

}
