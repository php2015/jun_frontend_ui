package com.jeasy.demo.blog.controllers;

import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.base.controllers.BaseController;
import com.jeasy.base.controllers.ModelResult;
import com.jeasy.base.resolver.FromJson;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;
import com.jeasy.doc.annotation.AuthorEnum;
import com.jeasy.doc.annotation.InitField;
import com.jeasy.doc.annotation.MethodDoc;
import com.jeasy.doc.annotation.StatusEnum;
import com.jeasy.validate.ValidateNotNull;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 18:18
 */
@Slf4j
@Path("blog")
public class BlogController extends BaseController {

    @Autowired
    private BlogService blogService;

    @MethodDoc(lists = Blog.class, desc={"APP端", "Blog", "列表"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("list")
    public String list(@FromJson Blog blog) {
        List<Blog> blogList = blogService.find(blog);
        return renderList(ModelResult.CODE_200, ModelResult.SUCCESS, blogList);
    }

    @MethodDoc(pages = Blog.class, desc={"APP端", "Blog", "分页"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("page")
    public String page(@FromJson Blog blog,
                       @InitField(name = "pageNo", value = "1", desc = "当前页码") @FromJson @Param("pageNo") Integer pageNo,
                       @InitField(name = "pageSize", value = "10", desc = "每页大小") @FromJson @Param("pageSize") Integer pageSize) {
        Integer totalCount = blogService.count(blog);
        Integer offset = (pageNo - 1) * pageSize;
        List<Blog> blogList = blogService.page(blog, offset, pageSize);
        return renderPage(ModelResult.CODE_200, ModelResult.SUCCESS, totalCount, blogList, pageSize, pageNo);
    }

    @MethodDoc(desc={"APP端", "Blog", "新增"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("add")
    public String add(@FromJson Blog blog) {
        Long id = blogService.save(blog);
        return renderMessage(id > 0 ? ModelResult.CODE_200 : ModelResult.CODE_500, id > 0 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    @MethodDoc(entity = Blog.class, desc={"APP端", "Blog", "详情"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("show")
    public String show(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") @Param("id") Long id) {
        Blog blog = blogService.getById(id);
        return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, blog);
    }

    @MethodDoc(desc={"APP端", "Blog", "更新"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("modify")
    public String modify(@FromJson Blog blog) {
        Integer result = blogService.modify(blog);
        return renderMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    @MethodDoc(desc={"APP端", "Blog", "删除"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("remove")
    public String remove(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") @Param("id") Long id) {
        Integer result = blogService.remove(id);
        return renderMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }
}