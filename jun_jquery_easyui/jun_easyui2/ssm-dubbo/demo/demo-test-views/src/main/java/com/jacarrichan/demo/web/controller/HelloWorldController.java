package com.jacarrichan.demo.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jacarrichan.demo.lemur.service.DemoService;

@Controller
@RequestMapping("/hello")
public class HelloWorldController {
	@Resource
	DemoService demoService;

	@RequestMapping("/helloworld" )
	public void getNewName(HttpServletRequest request,ModelMap  model)throws  Exception {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("text", demoService.find());
		model.addAllAttributes(parameter);
	}

}
