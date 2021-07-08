package com.jeasy.demo.blog.controller;

import java.util.List;

import com.jeasy.base.controller.ControllerSupport;
import com.jeasy.base.controller.ModelResult;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
@Slf4j
public class BlogController extends ControllerSupport {

	@Before(GET.class)
	public void list() {
		List<Blog> blogList = BlogService.me.find(getModel(Blog.class));
    	renderList(ModelResult.CODE_200, ModelResult.SUCCESS, transfer(blogList));
    }

    @Before(GET.class)
    public void page() {
    	int pageNo = getParaToInt("pageNo", 1);
    	int pageSize = getParaToInt("pageSize", 10);
    	List<Blog> blogList = BlogService.me.page(getModel(Blog.class), pageNo, pageSize);
        int totalCount = BlogService.me.count(getModel(Blog.class));
        renderPage(ModelResult.CODE_200, ModelResult.SUCCESS, totalCount, transfer(blogList), pageSize, pageNo);
	}

	@Before(POST.class)
    public void add() {
		BlogService.me.save(getModel(Blog.class));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
	}

	@Before(GET.class)
	public void show() {
        renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, transfer(BlogService.me.getById(getParaToLong("id", 0l))));
	}

	@Before(POST.class)
    public void modify() {
		BlogService.me.modify(getModel(Blog.class));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
    }

	@Before(POST.class)
    public void remove() {
		BlogService.me.remove(getParaToLong("id", 0l));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
    }
}