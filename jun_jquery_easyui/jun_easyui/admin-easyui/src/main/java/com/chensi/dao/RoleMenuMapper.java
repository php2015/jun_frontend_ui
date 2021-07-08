package com.chensi.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.chensi.model.RoleMenu;

public interface RoleMenuMapper extends CommonMapper<RoleMenu>{

	void savePermission(@Param("roleId")Integer roleId,@Param("menuIds") List<Integer> menuIds);

}
