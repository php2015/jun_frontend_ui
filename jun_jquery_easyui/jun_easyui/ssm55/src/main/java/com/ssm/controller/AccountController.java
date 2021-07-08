package com.ssm.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.ssm.entity.Account;
import com.ssm.service.AccountService;

@Controller
@RequestMapping(value="/account")
public class AccountController {

	@Resource(name="accountService")
	private AccountService accountService;
	
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public ModelAndView list(HttpServletRequest request){
		ModelAndView mv = new ModelAndView("list");
		mv.addObject("list", accountService.getList());
		return mv;
	}
	
	@RequestMapping("/show")
	public String show(Integer id, Model model){
		System.out.println("##ID:" + id);
		model.addAttribute(accountService.getAccount(id));
		return "show";
	}
	
	@RequestMapping("/add")
	public String add(Account acc) {
		System.out.println(acc);
		accountService.saveAccount(acc);
		return "redirect:/account/list";
	}
	
	@ExceptionHandler(Exception.class)
	public String exception(Exception e, HttpServletRequest request) {
		//e.printStackTrace();
		request.setAttribute("exception", e);
		return "error";
	}
}
