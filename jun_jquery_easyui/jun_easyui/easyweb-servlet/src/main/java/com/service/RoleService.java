package com.service;

import com.dao.RoleDao;
import com.entity.Role;
import com.ex.MyException;
import com.framework.annotation.Action;
import com.framework.annotation.Autowired;
import com.framework.annotation.Source;
import com.vo.QueryPageVO;
import com.vo.ResultVO;
import top.appx.easysql.Restrain;
import top.appx.easysql.data.PageInfo;

import java.util.List;

/**
 * Created by john on 2015/12/11.
 */
@Source
public class RoleService {
    @Autowired
    private RoleDao roleDao;

    public List<Role> query(){
        return roleDao.query(Restrain.order("name"));
    }

    public void add(Role role){
        roleDao.add(role,"已有相同的的角色", Restrain.eq("name",role.getName()));
    }
    public void modify(Role role){
        roleDao.modify(role,"角色名称不能重复",Restrain.eq("name",role.getName()));
    }
    public void delById(int id){
        int c = roleDao.total("select count(*) from tb_user where (roleIds ='" + id + "' or roleIds like '" + id + ",%' or roleIds like '%," + id + ",%' or roleIds like '%,"+id+"'"+") and del=1");
        if(c>0){
            throw new MyException("该角色下有"+c+"个用户,不能删除");
        }
        roleDao.delById(id);
    }
}
