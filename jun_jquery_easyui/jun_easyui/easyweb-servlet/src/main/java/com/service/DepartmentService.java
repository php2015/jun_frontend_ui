package com.service;

import com.dao.DepartmentDao;
import com.entity.Department;
import com.ex.MyException;
import com.framework.annotation.Autowired;
import com.framework.annotation.Source;
import top.appx.easysql.BaseDatabase;
import top.appx.easysql.Restrain;

import java.util.List;

/**
 * Created by john on 2015/12/10.
 */
@Source
public class DepartmentService {
    @Autowired
    private DepartmentDao departmentDao;

    public List<Department> query(){
        return departmentDao.query(Restrain.eq("del",1),Restrain.order("name"));
    }

    public void add(Department department){
        department.setDel(1);
        departmentDao.add(department,"该名称已存在",Restrain.eq("name",department.getName()));
    }
    public void modify(Department department){
        department.setDel(1);
        departmentDao.modify(department,"名称不能重复",Restrain.eq("name",department.getName()),Restrain.eq("del",1));
    }

    public void delById(int id) {
        int c = departmentDao.total("select count(*) from tb_user where departmentId=? and del=1",id);
        if(c>0){
            throw new MyException("该部门下有"+c+"个用户,不能删除");
        }
        Department department = new Department();
        department.setId(id);
        department.setDel(2);
        departmentDao.modify(department);
    }
}
