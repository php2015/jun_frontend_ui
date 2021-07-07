package com.ssm.service;

import java.util.List;

import com.ssm.common.mybatis.Page;
import com.ssm.entity.Role;

/** 
 * @description: 角色管理
 * @version 1.0
 * @author Kool Zhao
 * @createDate 2014-1-11;下午02:11:00
 */
public interface RoleService {

	List<Role> find(Page page, String name);
	
	List<Role> findAll();
	
	void save(Role role);

	Role get(Long id);

	void update(Role role);

	void delete(Long id);
}
