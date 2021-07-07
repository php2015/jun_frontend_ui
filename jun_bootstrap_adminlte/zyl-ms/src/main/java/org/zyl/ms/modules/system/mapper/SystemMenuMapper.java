package org.zyl.ms.modules.system.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.system.entity.SystemMenu;

public interface SystemMenuMapper {
	public int create(SystemMenu pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<SystemMenu> query(Map<String, Object> paramMap);
	public SystemMenu detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}