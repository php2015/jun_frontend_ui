package org.zyl.ms.modules.user.mapper;

import java.util.List;
import java.util.Map;

import org.zyl.ms.modules.user.entity.UserAddress;

public interface UserAddressMapper {
	public int create(UserAddress pi);
	public int delete(Map<String, Object> paramMap);
	public int update(Map<String, Object> paramMap);
	public List<UserAddress> query(Map<String, Object> paramMap);
	public UserAddress detail(Map<String, Object> paramMap);
	public int count(Map<String, Object> paramMap);
}