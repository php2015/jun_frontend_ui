package com.sgl.controller;

import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.sgl.model.User;
import com.sgl.service.UserService;

@Controller
public class UserController {
	@Autowired
	private UserService userService;
	@RequestMapping("/reg")
	public String register(){
		return "index";
	}
	@RequestMapping("/user")
	public ModelAndView addUser(User user,HttpSession session) {
		ModelAndView mav=new ModelAndView();
		if (!(user.getCode().equalsIgnoreCase(session.getAttribute("code").toString()))) {
			mav.setViewName("error");
			mav.addObject("msg","验证码不正确");
			return mav;
		}else {
			user.setId(UUID.randomUUID().toString());
			user.setRegtime(new Date());
			try {
				userService.addUser(user);
			//	request.setAttribute("user", user);
				mav.setViewName("success");
				mav.addObject("user", user);
				mav.addObject("msg", "注册成功了，可以去登陆了");
				return mav;
			} catch (Exception e) {
				mav.setViewName("menu");
				mav.addObject("user", null);
				mav.addObject("msg", "注册失败");
				return mav;
			}
		}
	}

}
