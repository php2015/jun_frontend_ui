package com.jacarrichan.demo.web.controller;

import org.springframework.ui.ModelMap;

public abstract class BaseController {
	protected void createJsonResult(ModelMap model, Object result) {
		model.addAttribute("result", result);
	}
}
