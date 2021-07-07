package org.mintleaf.controller;

import org.mintleaf.bean.UserBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author: MengchuZhang
 * @Date: 2018/10/10 16:04
 * @Version 1.0
 */
@Controller
public class UserController {

    @RequestMapping(value = "/user/index")
    public String index(HttpServletRequest request, UserBean user)
    {
        //将name属性传入到user_index.jsp页面中展示
        request.setAttribute("name",user.getName());
        //跳转user_index.jsp页面
        return "user_index";
    }
}
