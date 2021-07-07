package com.jeasy;

import com.jeasy.base.interceptor.ControllerCostLogInterceptor;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.route.BlogRoutes;
import com.jeasy.base.controller.MonitorController;
import com.jeasy.index.IndexController;
import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;

public class Config extends JFinalConfig {

    public void configConstant(Constants constants) {
        PropKit.use("a_little_config.txt");

        constants.setEncoding("UTF-8");
        constants.setViewType(ViewType.JSP);
    }

    public void configRoute(Routes routes) {
        routes.add("/", IndexController.class, "/views");

        routes.add("/monitor", MonitorController.class, "/views");

        routes.add(new BlogRoutes());
    }

    public void configPlugin(Plugins me) {
        C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl").trim(), PropKit.get("user").trim(), PropKit.get("password").trim());
        me.add(c3p0Plugin);

        ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
        me.add(arp);

        arp.addMapping("blog", Blog.class);
    }

    public void configInterceptor(Interceptors me) {
        me.addGlobalActionInterceptor(new ControllerCostLogInterceptor());
    }

    public void configHandler(Handlers me) {

    }

    /**
     * 建议使用 JFinal 手册推荐的方式启动项目
     * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
     */
    public static void main(String[] args) {
        JFinal.start("/Users/TaoBangren/git@osc/easy-code/base-jfinal-web/src/main/webapp", 8080, "/", 5);
    }
}