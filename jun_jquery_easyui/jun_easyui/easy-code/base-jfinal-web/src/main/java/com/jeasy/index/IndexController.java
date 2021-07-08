package com.jeasy.index;

import com.jfinal.aop.Clear;
import com.jfinal.core.Controller;

public class IndexController extends Controller {

	@Clear
	public void index() {
		render("index.jsp");
	}
}