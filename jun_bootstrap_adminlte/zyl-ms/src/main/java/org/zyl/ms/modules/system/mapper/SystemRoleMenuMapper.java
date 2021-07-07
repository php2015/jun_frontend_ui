package org.zyl.ms.modules.system.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.system.entity.SystemRoleMenu;

public interface SystemRoleMenuMapper {
	public int create(SystemRoleMenu pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<SystemRoleMenu> query(Map<String, Object> paramMap);
	public SystemRoleMenu detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}