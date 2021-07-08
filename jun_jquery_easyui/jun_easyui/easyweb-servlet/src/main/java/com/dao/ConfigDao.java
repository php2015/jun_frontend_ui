package com.dao;

import com.entity.Config;
import com.ex.ErrorException;
import com.ex.MyException;
import com.framework.annotation.Source;
import top.appx.easysql.BaseDatabase;
import top.appx.easysql.Restrain;

/**
 * Created by john on 2015/12/10.
 */
@Source
public class ConfigDao extends BaseDao<Config> {
    public void modify(Config config){
        BaseDatabase db = getDatabase();
        try{
            db.beginTrans();
            db.modify(config);
            if(db.total(entityClass, Restrain.eq("name",config.getName()))>1){
                throw new MyException("名称不能重复");
            }
            db.commitTrans();
        }catch (Exception ex){
            db.rollback();
            if(ex.getClass().equals(MyException.class)){
                throw (MyException)ex;
            }
            throw new ErrorException(ex);
        }finally {
            db.close();
        }
    }
}
