package cn.javabb.sys.service;

import org.springframework.stereotype.Service;

import cn.javabb.common.base.BaseService;
import cn.javabb.sys.entity.User;

@Service
public class UserService extends BaseService<User>{

    public User queryByUserName(String userName){
        User u = new User();
        u.setUserName(userName);
        return this.queryOne(u);
    }
    
    
}
