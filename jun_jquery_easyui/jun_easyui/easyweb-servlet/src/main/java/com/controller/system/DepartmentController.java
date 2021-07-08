package com.controller.system;

import com.controller.BaseController;
import com.entity.Department;
import com.framework.annotation.Action;
import com.framework.annotation.Autowired;
import com.framework.annotation.Controller;
import com.service.DepartmentService;

import javax.servlet.http.HttpServletRequest;


/**
 * Created by john on 2015/12/10.
 */
@Controller("/system/department")
public class DepartmentController extends BaseController<Department> {

    @Autowired
    private DepartmentService departmentService;

    @Action("query")
    public Object query(){
        return departmentService.query();
    }

    @Action("add")
    public void add(HttpServletRequest request){
        departmentService.add(requestModel(request));
    }
    @Action("modify")
    public void modify(HttpServletRequest request){
        departmentService.modify(requestModel(request));
    }
    @Action("delById")
    public void delById(HttpServletRequest request){
        int id = Integer.parseInt(request.getParameter("id"));
        departmentService.delById(id);
    }
}
