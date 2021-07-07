package com.chensi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chensi.dao.UserMapper;
import com.chensi.model.User;
import com.chensi.service.IUserService;
@Service
public class UserService extends CommonService<User> implements IUserService{

	@Autowired
	private UserMapper userMapper;
	
	protected void init(){
		super.mapper=userMapper;
	}
}
