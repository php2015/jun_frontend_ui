package com.sgl.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.sgl.service.MenuService;

@Controller("menuController")
public class MenuController {
	
	private MenuService menuService;
	
	public MenuService getMenuService() {
		return menuService;
	}
	@Autowired
	public void setMenuService(MenuService menuService) {
		this.menuService = menuService;
	}
	@RequestMapping("/menu")
	public String gotoMenu(){
		return "menu";
	}
	@RequestMapping("/getMenu")
	public void getMenu(String id,HttpServletResponse response){
	
		try {
			response.setCharacterEncoding("utf-8");
		response.getWriter().write(JSON.toJSONString(menuService.getMenu(id)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
