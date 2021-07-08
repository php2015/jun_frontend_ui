package com.jeasy.demo.blog.controller;

import com.jeasy.base.controller.BaseController;
import com.jeasy.base.resolver.FromJson;
import com.jeasy.collection.MapExUtils;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;
import com.jeasy.doc.annotation.AuthorEnum;
import com.jeasy.doc.annotation.InitField;
import com.jeasy.doc.annotation.MethodDoc;
import com.jeasy.doc.annotation.StatusEnum;
import com.jeasy.validate.ValidateNotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 17:13
 */
@Slf4j
@Controller
@RequestMapping("/blog")
public class BlogController extends BaseController<BlogService, Blog> {

	@MethodDoc(lists = Blog.class, desc={"APP端", "Blog", "列表"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "list")
	@ResponseBody
	public void list(@FromJson Blog blog) {
		super.list(MapExUtils.toObjMap(blog));
	}

	@MethodDoc(pages = Blog.class, desc={"APP端", "Blog", "分页"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "page")
	@ResponseBody
	public void page(@FromJson Blog blog,
					 @InitField(name = "pageNo", value = "1", desc = "当前页码") @FromJson Integer pageNo,
					 @InitField(name = "pageSize", value = "10", desc = "每页大小") @FromJson Integer pageSize) {
		super.page(MapExUtils.toObjMap(blog), pageSize, pageNo);
	}

	@MethodDoc(desc={"APP端", "Blog", "新增"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "add")
	@ResponseBody
	public void add(@FromJson Blog blog) {
		super.save(blog);
	}

	@MethodDoc(entity = Blog.class, desc={"APP端", "Blog", "详情"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "show")
	@ResponseBody
	public void show(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") Long id) {
		super.detail(id);
	}

	@MethodDoc(desc={"APP端", "Blog", "更新"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "modify")
	@ResponseBody
	public void modify(@FromJson Blog blog) {
		super.update(blog);
	}

	@MethodDoc(desc={"APP端", "Blog", "删除"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "remove")
	@ResponseBody
	public void remove(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") Long id) {
		super.delete(id);
	}
}