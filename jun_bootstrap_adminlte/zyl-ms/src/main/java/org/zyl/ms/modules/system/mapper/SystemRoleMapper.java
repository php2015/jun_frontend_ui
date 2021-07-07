package org.zyl.ms.modules.system.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.system.entity.SystemRole;

public interface SystemRoleMapper {
	public int create(SystemRole pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<SystemRole> query(Map<String, Object> paramMap);
	public SystemRole detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}