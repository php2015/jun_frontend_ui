package com.controller.system;

import com.controller.BaseController;
import com.entity.Role;
import com.framework.annotation.Action;
import com.framework.annotation.Autowired;
import com.framework.annotation.Controller;
import com.service.RoleService;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by john on 2015/12/11.
 */
@Controller("/system/role")
public class RoleController extends BaseController<Role> {

    @Autowired
    private RoleService roleService;
    @Action("query")
    public Object query(){
        return roleService.query();
    }

    @Action("add")
    public void add(HttpServletRequest request){
        roleService.add(requestModel(request));
    }

    @Action("modify")
    public void modify(HttpServletRequest request){
        roleService.modify(requestModel(request));
    }

    @Action("delById")
    public void delById(HttpServletRequest request){
        int id = Integer.parseInt(request.getParameter("id"));
        roleService.delById(id);
    }

}
