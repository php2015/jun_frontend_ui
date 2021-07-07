package com.webuploader.eg;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("webuploader")
public class WebuploaderController {

	@RequestMapping("")
	public String ckeditor(HttpServletRequest request) {
		return "webuploader";
	}

}
