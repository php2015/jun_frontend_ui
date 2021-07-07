package com.jacarrichan.demo.lemur.service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jacarrichan.demo.common.models.Response;
import com.jacarrichan.demo.common.service.query.BaseQuery;
import com.jacarrichan.demo.lemur.models.UserVo;
import com.jacarrichan.demo.lemur.service.query.UserQuery;

@Slf4j
public class UserServiceTest extends BaseServiceTest {
	@Test
	public void test() {
		System.out.println(context);
	}

	@Autowired
	private UserService userService;

	@Test
	public void testFindByQuery() {
		BaseQuery query = new UserQuery();
		Response<List<UserVo>> list=userService.findByQuery(query);
		for (UserVo user : list.getResult()) {
			log.debug(user.toString());
		}
	}
}
