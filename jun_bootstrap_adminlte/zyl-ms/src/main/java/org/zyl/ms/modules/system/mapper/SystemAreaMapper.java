package org.zyl.ms.modules.system.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.system.entity.SystemArea;

public interface SystemAreaMapper {
	public int create(SystemArea pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<SystemArea> query(Map<String, Object> paramMap);
	public SystemArea detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}