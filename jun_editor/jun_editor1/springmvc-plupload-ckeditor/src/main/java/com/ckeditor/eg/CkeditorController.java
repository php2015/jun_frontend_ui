package com.ckeditor.eg;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("ckeditor")
public class CkeditorController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger
			.getLogger(CkeditorController.class);

	@RequestMapping("")
	public String ckeditor(HttpServletRequest request) {
		logger.info("ckeditor");
		return "ckeditor";
	}

}
