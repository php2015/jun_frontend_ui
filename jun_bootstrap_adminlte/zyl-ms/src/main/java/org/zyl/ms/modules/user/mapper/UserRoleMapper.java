package org.zyl.ms.modules.user.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.user.entity.UserRole;

public interface UserRoleMapper {
	public int create(UserRole pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<UserRole> query(Map<String, Object> paramMap);
	public UserRole detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}