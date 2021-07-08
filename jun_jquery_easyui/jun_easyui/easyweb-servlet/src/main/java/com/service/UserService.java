package com.service;

import com.dao.UserDao;
import com.entity.User;
import com.ex.MyException;
import com.framework.annotation.Action;
import com.framework.annotation.Autowired;
import com.framework.annotation.Source;
import com.util.DateTime;
import com.vo.QueryPageVO;
import com.vo.ResultVO;
import top.appx.easysql.Restrain;
import top.appx.easysql.data.PageInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by john on 2015/12/8.
 */
@Source
public class UserService {
    @Autowired
    private UserDao userDao;

    public User login(String username, String password){
        User user = userDao.queryByUsername(username);
        if(user == null){
            throw new MyException("用户名不存在或已被删除");
        }
        if(!user.getPassword().equals(password)){
            throw new MyException("密码错误");
        }
        userDao.updateLastTime(user.getId());
        return user;
    }
    public ResultVO queryPage(QueryPageVO queryPageVO){
        queryPageVO.getRestrainList().add(Restrain.eq("del",1));
        PageInfo pageInfo = userDao.queryPageVO(queryPageVO);
        return ResultVO.data().p("total",pageInfo.getTotal()).p("rows",pageInfo.getData());
    }

    public void add(User user) {
        user.setDel(1);
        user.setCreateTime(DateTime.now());
        userDao.add(user,"该用户名已存在",Restrain.eq("username",user.getUsername()),Restrain.eq("del",1));
    }

    public void modify(User user) {
        userDao.modify(user,"已存在相同名称的用户名",Restrain.eq("username",user.getUsername()),Restrain.eq("del",1));
    }

    public void delById(int id){
        User user =new User();
        user.setId(id);
        user.setDel(2);
        userDao.modify(user);
    }
    public int delByIds(List<Integer> ids) {
        User user = new User();
        user.setDel(2);
       return userDao.modifys(user,Restrain.in("id",ids.toArray()));
    }

    public void resetPasswordByIds(List<Integer> ids, String newPassword) {
        User user = new User();
        user.setPassword(newPassword);
        userDao.modifys(user,Restrain.in("id", ids.toArray()));
    }


}
