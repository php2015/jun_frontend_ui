package cn.javabb.content.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.common.util.ShiroUtils;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.entity.Content;
import cn.javabb.content.service.BlogService;
import cn.javabb.sys.entity.User;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
@RequestMapping("/admin/blog")
public class BlogAdminController extends BaseController{
    @Autowired
    private BlogService blogService;
    @GetMapping("/list")
    public String toListpage(){
        return "page/admin/content/blog/blogList";
    }
    @GetMapping("/add")
    public String toSavePage(){
        String id = request.getParameter("blogId");
        if(BUtil.isNotEmpty(id)){
            request.setAttribute("blogId",id);
        }
        return "page/admin/content/blog/blogAdd";
    }
    
    @ResponseBody
    @GetMapping("/")
    public Object list(Blog blog){
        JSONObject map = new JSONObject();
        String page = request.getParameter("page");
        String size = request.getParameter("limit");
        map.put("page", page);
        map.put("size",size);
        Page blogList = blogService.listBlogWithAll(map);
        return ResponseModel.table(blogList);
    }
    
    @ResponseBody
    @GetMapping("/{blogId}")
    public Object getBlog(@PathVariable String blogId){
        if(BUtil.isNull(blogId)){
            return ResponseModel.Failure("id不能为空");
        }
        Blog blog = blogService.queryBlogOne(blogId);
        return ResponseModel.Success(blog);
    }
    
    @Log("博客置顶")
    @ResponseBody
    @PostMapping("/updateTop")
    public Object updataTop(Blog blog){
    	String msg = "";
        if(BUtil.isNull(blog.getId())){
            return ResponseModel.Failure("选择修改的博客ID为空");
        }
        if(1==blog.getBlogTop()){
            blog.setBlogTop(0);
            msg = "取消置顶成功";
        }else{
            blog.setBlogTop(1);
            msg = "置顶成功";
        }
        int num = blogService.updateSelective(blog);
        if(num>0){
            return ResponseModel.Success(msg);
        }else{
            return ResponseModel.Failure("置顶操作失败");
        }
    }
    @Log("博客热点更新")
    @ResponseBody
    @PostMapping("/updateHot")
    public Object updataHot(Blog blog){
    	String msg = "";
        if(BUtil.isNull(blog.getId())){
            return ResponseModel.Failure("选择修改的博客ID为空");
        }
        if(1==blog.getBlogHot()){
            blog.setBlogHot(0);
            msg = "取消热点成功";
        }else{
            blog.setBlogHot(1);
            msg = "加热点成功";
        }
        int num = blogService.updateSelective(blog);
        if(num>0){
            return ResponseModel.Success(msg);
        }else{
            return ResponseModel.Failure("热点操作失败");
        }
    }
    
    @Log("博客删除")
    @ResponseBody
    @DeleteMapping("/{ids}")
    public Object delete(@PathVariable String ids){
    	if(BUtil.isNull(ids)){
    		return ResponseModel.Failure("删除失败");
    	}
    	List<String> idList = ListUtils.stringToListString(ids);
    	int num = blogService.delBlogs(idList);
    	if(num>0){
    		return ResponseModel.Success("删除成功");
    	}else{
    		return ResponseModel.Failure("删除失败");
    	}
    }
    @Log("博客保存")
    @ResponseBody
    @PostMapping("/")
    public Object save(Blog blog){
    	User user = ShiroUtils.getUser();
    	if(BUtil.isNull(blog)){
    		return ResponseModel.Failure("内容不能为空");
    	}
    	if(BUtil.isNull(user)){
    		return ResponseModel.Failure("请先登录。");
    	}
    	//
    	String tags = request.getParameter("blogTag");
    	String content = request.getParameter("contentHtml");
    	Content con = new Content();
    	con.setContent(content);
    	con.setKeywords(getParamValue("keywords"));
        con.setDescription(getParamValue("description"));
        
    	blog.setContent(con);
    	blog.setBlogAuthor(user.getId());
    	int num = blogService.save(blog,tags);
    	if(num>0){
    		return ResponseModel.Success("保存成功");
    	}
    	return ResponseModel.Failure("保存失败");
    }
}
