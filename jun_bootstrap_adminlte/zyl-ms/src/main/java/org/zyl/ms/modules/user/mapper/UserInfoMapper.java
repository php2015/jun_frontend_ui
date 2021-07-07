package org.zyl.ms.modules.user.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.user.entity.UserInfo;

public interface UserInfoMapper {
	public int create(UserInfo pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<UserInfo> query(Map<String, Object> paramMap);
	public UserInfo detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}