package cn.javabb.content.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.base.BaseController;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.PageUtil;
import cn.javabb.common.util.ResultUtil;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.service.BlogService;
import cn.javabb.sys.entity.SysMenu;
import cn.javabb.sys.service.SysMenuService;

@Controller
@RequestMapping("/blog")
public class BlogController extends BaseController{
    
    private static final String BLOG_LIST_URL="page/front/blog/blogList";
    private static final String BLOG_DETAIL_URL="page/front/blog/detail";
    
    @Autowired
    BlogService blogService;
    @Autowired
    SysMenuService menuService;
    
    /**
     * 查询所有数据
     * @author QINB
     * @return
     */
    @GetMapping("/list")
    public Object list(Model model){
        JSONObject param = getPageSize();
        Page blogs = blogService.listBlogWithAll(param);
        String pagaintion = PageUtil.genPagination("/blog/list", blogs.getTotal(),Integer.parseInt(getPage()),Integer.parseInt(getSize()));
        model.addAttribute("pagaintion", pagaintion);
        model.addAttribute("blogs",blogs);
        return ResultUtil.view(BLOG_LIST_URL,menuService.loadMenuTDK("index"));
    }
    
    
    /**
     * 分类博客列表
     * @author QINB
     * @param catalogId
     * @return
     */
    @GetMapping("/catalog/{catalogId}")
    public Object listByCatalog(@PathVariable String catalogId,Model model){
        JSONObject param = getPageSize();
        param.put("catalogId", catalogId);
        Page blogs = blogService.listBlogWithAll(param);
        System.out.println(getPage());
        System.out.println(getSize());
        String pagaintion = PageUtil.genPagination("/blog/catalog/"+catalogId, blogs.getTotal(),Integer.parseInt(getPage()),Integer.parseInt(getSize()));
        model.addAttribute("pagination", pagaintion);
        model.addAttribute("blogs",blogs);
        return ResultUtil.view(BLOG_LIST_URL,menuService.loadMenuTDK("index"));
    }
    /**
     * 分类博客列表（分页）
     * @author QINB
     * @param catalogId
     * @param currentPage
     * @return
     */
    @GetMapping("/catalog/{catalogId}/{currentPage}")
    public Object listPageByCatalog(@PathVariable String catalogId,@PathVariable String currentPage,Model model){
        JSONObject param = getPageSize();
        param.put("catalogId", catalogId);
        param.put("page",currentPage);
        Page blogs = blogService.listBlogWithAll(param);
        String pagaintion = PageUtil.genPagination("/blog/catalog/"+catalogId, blogs.getTotal(),Integer.parseInt(currentPage),Integer.parseInt(getSize()));
        model.addAttribute("pagination", pagaintion);
        model.addAttribute("blogs",blogs);
        return ResultUtil.view(BLOG_LIST_URL,menuService.loadMenuTDK("index"));
    }
    /**
     * 标签博客列表
     * @author QINB
     * @param catalogId
     * @return
     */
    @GetMapping("/tag/{tagId}")
    public Object listByTag(@PathVariable String tagId,Model model){
        JSONObject param = getPageSize();
        param.put("tagId", tagId);
        Page blogs = blogService.listBlogWithAll(param);
        String pagaintion = PageUtil.genPagination("/blog/tagId/"+tagId, blogs.getTotal(),Integer.parseInt(getPage()),Integer.parseInt(getSize()));
        model.addAttribute("pagination", pagaintion);
        model.addAttribute("blogs",blogs);
        return ResultUtil.view(BLOG_LIST_URL,menuService.loadMenuTDK("index"));
    }
    /**
     * 标签博客列表（分页）
     * @author QINB
     * @param catalogId
     * @param currentPage
     * @return
     */
    @GetMapping("/tag/{tagId}/{currentPage}")
    public Object listPageByTag(@PathVariable String tagId,@PathVariable String currentPage,Model model){
        JSONObject param = getPageSize();
        param.put("tagId", tagId);
        param.put("page",currentPage);
        Page blogs = blogService.listBlogWithAll(param);
        String pagaintion = PageUtil.genPagination("/blog/tag/"+tagId, blogs.getTotal(),Integer.parseInt(currentPage),Integer.parseInt(getSize()));
        model.addAttribute("pagination", pagaintion);
        model.addAttribute("blogs",blogs);
        return ResultUtil.view(BLOG_LIST_URL,menuService.loadMenuTDK("index"));
    }
    @GetMapping("/{blogId}")
    public Object detail(@PathVariable String blogId,Model model){
        if(BUtil.isNull(blogId)){
            return "/500";
        }
        JSONObject param = new JSONObject();
        param.put("blogId", blogId);
        Page blog = blogService.listBlogWithAll(param);
        
        blogService.updateReadCount(Integer.valueOf(blogId));
        
        model.addAttribute("blog",blog.getResult().get(0));
        return ResultUtil.view(BLOG_DETAIL_URL,blogService.loadBlogTDK(blogId));
    }
}
