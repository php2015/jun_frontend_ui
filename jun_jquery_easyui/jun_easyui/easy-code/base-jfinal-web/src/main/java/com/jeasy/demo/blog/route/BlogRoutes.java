package com.jeasy.demo.blog.route;

import com.jeasy.demo.blog.controller.BlogController;
import com.jfinal.config.Routes;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/06 11:23
 */
public class BlogRoutes extends Routes {

    @Override
    public void config() {
        add("/blog", BlogController.class);
    }
}