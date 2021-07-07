package com.jacarrichan.demo.lemur.service.impl;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.lemur.mapper.UserMapper;
import com.jacarrichan.demo.lemur.models.UserVo;
import com.jacarrichan.demo.lemur.service.UserService;

@Slf4j
@Service
public class UserServiceImpl extends BaseServiceImpl<UserVo, Integer> implements
		UserService {
	public BaseMapper getMapper() {
		return applicationContext.getBean(UserMapper.class);
	}
}
