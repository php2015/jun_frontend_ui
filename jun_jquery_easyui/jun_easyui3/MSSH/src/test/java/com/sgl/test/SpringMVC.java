package com.sgl.test;

import java.util.Date;
import java.util.UUID;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.sgl.model.User;
import com.sgl.service.UserService;

public class SpringMVC {
	
	private static UserService userServiceImpl;
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {

		ApplicationContext ctx = new ClassPathXmlApplicationContext(
				new String[]{"spring.xml","spring-hibernate.xml"});
		userServiceImpl =(UserService) ctx.getBean("userService");
	
	}

	@Test
	public void testspringMVC() {
		User user =new User();
		user.setId(UUID.randomUUID().toString());
		user.setUsername("ko");
		user.setRegtime(new Date());
		userServiceImpl.addUser(user);
	
	}

}
