package cn.javabb.content.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;

import cn.javabb.common.base.BaseController;
import cn.javabb.common.util.PageUtil;
import cn.javabb.common.util.ResultUtil;
import cn.javabb.content.service.BlogService;
import cn.javabb.content.service.TagService;
import cn.javabb.sys.entity.SysMenu;
import cn.javabb.sys.service.SysMenuService;

@Controller
public class IndexController extends BaseController {

    private static final String INDEX_URL = "page/front/index";
    private static final String PAGE_URL = "page/front/page/page";

    @Autowired
    TagService tagService;
    @Autowired
    BlogService blogService;
    @Autowired
    SysMenuService menuService;

    /**
     * 返回index.html首页
     * 
     * @return
     */
    @RequestMapping({
        "/", "/index"
    })
    public ModelAndView toIndex(Model model) {
        String page = getPage();
        String size = getSize();
        JSONObject param = new JSONObject();
        param.put("page", page);
        param.put("size", size);
        Page blogs = blogService.listBlogWithAll(param);
        String pagination = PageUtil.genPagination("/blog/list", blogs.getTotal(), Integer.valueOf(page),
            Integer.valueOf(size));
        
        SysMenu menu = menuService.getMenuAllByCode("index");
        model.addAttribute("menu",menu);
        model.addAttribute("blogs", blogs);
        model.addAttribute("pagination", pagination);
        return ResultUtil.view(INDEX_URL,menuService.loadMenuTDK("index"));
    }

    /**
     * 地址转发
     * @author QINB
     * @param menuCode
     * @param model
     * @return
     */
    @RequestMapping({"/front/{menuCode}"})
    public ModelAndView toPageByCode(@PathVariable String menuCode, Model model) {
        System.out.println(menuCode);
        if(StringUtils.isBlank(menuCode)){
            return ResultUtil.view(INDEX_URL);
        }
        menuCode  = "front/"+menuCode;
        SysMenu menu = menuService.getMenuAllByCode(menuCode);
        if(menu == null){
            return ResultUtil.view(INDEX_URL);
        }
        model.addAttribute("menu", menu);
        return ResultUtil.view(PAGE_URL,menuService.loadMenuTDK("index"));
    }

}
