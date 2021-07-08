package cn.javabb.sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.javabb.common.base.BaseController;
import cn.javabb.common.componet.InitSystem;
import cn.javabb.common.model.ResponseModel;

@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController{

    @Autowired
    private InitSystem initSystem;
	/**
	 * 返回后台.html首页
	 * @return 
	 */
	@RequestMapping({"/toAdminMain"})
	public ModelAndView toAdminMain(){
		ModelAndView mav = new ModelAndView();
		mav.setViewName("page/admin/main");
		return mav;
	}
	@ResponseBody
	@RequestMapping("/clearCache")
	public Object clearCache(){
	    initSystem.loadData(request.getServletContext());
	    return ResponseModel.Success("缓存刷新成功");
	}
	
}
