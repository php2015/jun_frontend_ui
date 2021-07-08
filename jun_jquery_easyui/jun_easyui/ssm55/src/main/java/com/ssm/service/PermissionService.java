package com.ssm.service;

import com.ssm.entity.Permission;


/** 
 * @description: 授权操作
 * @version 1.0
 * @author Kool Zhao
 * @createDate 2014-1-11;下午02:11:36
 */
public interface PermissionService {

	void save(Permission permission);
	
	Permission get(Long id);
	
	void update(Permission permission);
	
	void delete(Long id);
	
}
