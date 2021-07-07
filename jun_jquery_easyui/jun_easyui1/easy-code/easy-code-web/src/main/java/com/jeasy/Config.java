package com.jeasy;

import com.jeasy.index.IndexController;
import com.jfinal.config.*;
import com.jfinal.kit.PropKit;
import com.jfinal.render.ViewType;

public class Config extends JFinalConfig {

    public void configConstant(Constants constants) {
        PropKit.use("a_little_config.txt");

        constants.setEncoding("UTF-8");
        constants.setViewType(ViewType.JSP);
    }

    public void configRoute(Routes routes) {
        routes.add("/", IndexController.class, "/views");
    }

    public void configPlugin(Plugins me) {

    }

    public void configInterceptor(Interceptors me) {
    }

    public void configHandler(Handlers me) {

    }

    /**
     * 建议使用 JFinal 手册推荐的方式启动项目
     * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
     */
    public static void main(String[] args) {
    }
}