package com.jacarrichan.demo.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jacarrichan.demo.common.service.query.BaseQuery;
import com.jacarrichan.demo.lemur.service.UserService;
import com.jacarrichan.demo.lemur.service.query.UserQuery;

@Controller
@RequestMapping(value = { "/user" })
public class UserController extends BaseController {
	@Autowired
	private UserService userService;

	@RequestMapping(value = { "/index" })
	public void index(ModelMap model, HttpServletRequest request) {

	}

	@RequestMapping(value = { "/{id}" })
	public void show(ModelMap model, HttpServletRequest request,
			@RequestParam("id") Integer id) {
		System.out.println();
	}

	@RequestMapping(value = { "/list" })
	public void list(ModelMap model, HttpServletRequest request) {
		BaseQuery query = new UserQuery();
		createJsonResult(model, userService.findByQuery(query).getResult());
	}

}
