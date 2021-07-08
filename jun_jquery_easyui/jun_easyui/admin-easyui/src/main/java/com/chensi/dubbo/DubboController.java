package com.chensi.dubbo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.chensi.common.AjaxJson;

/**
 * dubbo消费，调用远程接口
 * @author chensi
 * @version 2016-9-4 上午12:07:05
 */
@Controller
@RequestMapping("rpc")
public class DubboController {

	@Autowired
	private DemoService demoService;

	@RequestMapping("viewDubbo")
	public ModelAndView viewDubbo(String text) {
		return new ModelAndView("rpc/dubbo");
	}

	@RequestMapping("dubbo.do")
	@ResponseBody
	public AjaxJson dubbo(String text) {
		String message = demoService.sayHello(text);
		return AjaxJson.getSuccessInfo(message);
	}
}
