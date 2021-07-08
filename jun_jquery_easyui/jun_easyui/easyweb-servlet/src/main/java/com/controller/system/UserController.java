package com.controller.system;

import com.controller.BaseController;
import com.entity.User;
import com.ex.MyException;
import com.framework.annotation.Autowired;
import com.service.UserService;
import com.framework.annotation.Action;
import com.framework.annotation.Controller;
import com.vo.ResultVO;
import top.appx.easysql.data.PageInfo;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 燎火 on 2015/11/15.
 */
@Controller({"/system/user"})
public class UserController extends BaseController<User> {
    @Autowired
    private UserService userService;
    @Action("login")
    public Object login(HttpServletRequest req){
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        User user = userService.login(username,password);
        this.setSessionUser(req.getSession(true), user);
        return ResultVO.success();
    }
    @Action("getLoginUser")
    public Object getLoginUser(HttpServletRequest req){
        User user = getSessionUserThrowExIfNotExist(req.getSession(true));
        return user;
    }

    @Action("queryPage")
    public Object queryPage(HttpServletRequest request){
         return userService.queryPage(requestQueryPageVO(request));
    }
    @Action("add")
    public void add(HttpServletRequest request){
        User user = requestModel(request);
        userService.add(user);
    }
    @Action("modify")
    public void modify(HttpServletRequest request){
        User user = requestModel(request);
        userService.modify(user);
    }

    @Action("delById")
    public void delById(HttpServletRequest request){
        int id = Integer.parseInt(request.getParameter("id"));
        if(this.getSessionUserThrowExIfNotExist(request.getSession(true)).getId() == id){
            throw new MyException("不能删除自己");
        }
        userService.delById(id);
    }

    @Action("delByIds")
    public void delByIds(HttpServletRequest request){
        userService.delByIds(requestIds(request));
    }

    @Action("resetPasswordByIds")
    public void resetPasswordByIds(HttpServletRequest request){
        String newPassword = request.getParameter("newPassword");
        userService.resetPasswordByIds(requestIds(request),newPassword);
    }

    @Action("logout")
    public String logout(HttpServletRequest request){
        setSessionUser(request.getSession(),null);
        return "/page/home/login.jsp";
    }

}
