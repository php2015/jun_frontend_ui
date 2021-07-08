package com.sgl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sgl.dao.UserDaoI;
import com.sgl.model.User;

@Service("userService")
@Transactional
public class UserService
{ 	
	//自动注入dao
	@Autowired
	private UserDaoI<User> userDao;
	
	public void addUser(User user)
	{
		userDao.save(user);
	}

}
