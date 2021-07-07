package com.dao;

import com.entity.User;
import com.framework.annotation.Source;
import com.vo.QueryPageVO;
import top.appx.easysql.Restrain;
import top.appx.easysql.data.PageInfo;

/**
 * Created by john on 2015/12/8.
 */
@Source
public class UserDao extends BaseDao<User> {
    public User queryByUsername(String username){
        return this.queryFirstOrNull(Restrain.eq("username",username),Restrain.eq("del",1));
    }
    public void updateLastTime(int id){
        execute("update "+tableName+" set lastTime=now() where id="+id);
    }


}
