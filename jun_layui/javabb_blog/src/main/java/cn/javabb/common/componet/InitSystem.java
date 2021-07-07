package cn.javabb.common.componet;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import cn.javabb.common.util.ListUtils;
import cn.javabb.content.entity.Blog;
import cn.javabb.content.entity.Catalog;
import cn.javabb.content.entity.Tag;
import cn.javabb.content.service.BlogService;
import cn.javabb.content.service.CatalogService;
import cn.javabb.content.service.TagService;
import cn.javabb.sys.entity.SysConfig;
import cn.javabb.sys.entity.SysLink;
import cn.javabb.sys.entity.SysMenu;
import cn.javabb.sys.service.SysConfigService;
import cn.javabb.sys.service.SysLinkService;
import cn.javabb.sys.service.SysMenuService;

@Component
public class InitSystem implements ServletContextListener, ApplicationContextAware {

    private static ApplicationContext applicationContext;

    @Autowired
    private SysConfigService configService;
    @Autowired
    private BlogService blogService;
    @Autowired
    private TagService tagService;
    @Autowired
    private CatalogService catalogService;
    @Autowired
    private SysMenuService menuService;
    @Autowired
    private SysLinkService linkService;
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // TODO Auto-generated method stub
        this.applicationContext = applicationContext;
    }

    /**
     * 初始化加载数据
     * Description: 
     *  
     * @author QINB
     * @param servletContext
     */
    public void loadData(ServletContext application) {
        SysConfig sysConfig = new SysConfig();
        sysConfig.setConfigType("system");
        List<SysConfig> sysConfigList = configService.queryListByWhere(sysConfig);
        List<Blog> hotBlogs = blogService.listHotBlogs();
        List<Blog> topBlogs = blogService.listTopBlogs();
        List<Tag> blogTags = tagService.queryTagListByType("blog");
        List<Catalog> blogCatalogs = catalogService.queryAll("blog");
        List<SysLink> links = linkService.queryAll();
        List<SysMenu> navMenus = menuService.listNavMenus();
        System.out.println(blogCatalogs.toString());
        application.setAttribute("hotBlogs", hotBlogs);
        application.setAttribute("topBlogs", topBlogs);
        application.setAttribute("blogCatalogs", blogCatalogs);
        application.setAttribute("blogTags", blogTags);
        application.setAttribute("navMenus", navMenus);
        application.setAttribute("links", links);
        if(ListUtils.isNotEmpty(sysConfigList)){
            for(SysConfig config:sysConfigList){
                application.setAttribute(config.getConfigCode(),config.getConfigValue());
            }
        }
        
    }

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // TODO Auto-generated method stub
        loadData(sce.getServletContext());
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // TODO Auto-generated method stub

    }

}
