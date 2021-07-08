package com.dao;
import com.entity.*;
import com.ex.ErrorException;
import com.ex.MyException;
import com.vo.QueryPageVO;
import javafx.scene.control.Tab;
import top.appx.easysql.*;
import top.appx.easysql.annotation.Table;
import top.appx.easysql.data.DataRow;
import top.appx.easysql.data.PageInfo;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by john on 2015/12/9.
 */
public abstract class BaseDao<T> {

    protected final Class<T> entityClass;
    protected final String tableName;
    public BaseDao(){
        //region 获得泛型的类型
        Type genType  =getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType) genType ).getActualTypeArguments();
        entityClass = (Class) params[0];
        //endregion 获得泛型的类型


        String tname = null;
        if(entityClass.isAnnotationPresent(Table.class)){
            tname = ((Table)entityClass.getAnnotation(Table.class)).name();
        }
        if(tname ==  null || tname.length() == 0){
            tname = entityClass.getSimpleName();
        }
        tableName = tname;

    }

    protected BaseDatabase getDatabase() {
        try {
            return DatabaseFactory.createMySqlDatabase("jdbc:mysql://115.29.113.166:3306/easyweb?useUnicode=true&characterEncoding=utf-8","root","youotech");
        } catch (SQLException e) {
            throw new ErrorException(e);
        }
    }
    public T queryById(int id){
        BaseDatabase db= getDatabase();
        try {
            return db.queryById(entityClass, id);
        }finally {
            db.close();
        }
    }
    public T queryFirstOrNull(Restrain... restrains){
        BaseDatabase db = getDatabase();
        try {
            List<T> list = db.query(entityClass, restrains);
            if (list.size() > 0) {
                return list.get(0);
            }
            return null;
        }finally {
            db.close();
        }
    }

    public List<T> query(Restrain... restrains){
        BaseDatabase db = getDatabase();
        try {
            List list = db.query(entityClass, restrains);
            return list;
        }finally {
            db.close();
        }
    }

    public PageInfo<T> queryPage(QueryPageVO queryPageVO){
        BaseDatabase db = getDatabase();
        try{
            List<Restrain> restrains = queryPageVO.getRestrainList();
            return db.queryPage(entityClass,new PageInfo<T>(queryPageVO.getPage(),queryPageVO.getPageSize()),restrains.toArray(new Restrain[restrains.size()]));
        }finally {
            db.close();
        }
    }

    public PageInfo<DataRow> queryPageVO(QueryPageVO queryPageVO){
        BaseDatabase db = getDatabase();
        try{
            List<Restrain> restrains = queryPageVO.getRestrainList();

            String sql = "select user.*,dep.name as departmentName from tb_user user" +
                    " left join tb_department dep on dep.id = user.id ";
            return db.queryPageBySqlRestrain(sql,new PageInfo(queryPageVO.getPage(),queryPageVO.getPageSize()),restrains.toArray(new Restrain[restrains.size()]));
        }finally {
            db.close();
        }
    }

    public void add(T entity){
        BaseDatabase db = getDatabase();
        try{
            db.add(entity);
        }finally {
            db.close();
        }
    }

    /**
     *添加对象到数据库中,如果添加后满足根据restrains能够查询出超过一条记录时放弃修改并抛出异常
     * @param entity
     * @param errMsg
     * @param restrains
     */
    public void add(T entity,String errMsg,Restrain... restrains){
        BaseDatabase db = getDatabase();
        try{
            boolean ret = db.add(entity,1,restrains);
            if(!ret){
                throw new MyException(errMsg);
            }
        }finally {
            db.close();
        }
    }

    /**
     * 根据entity的id修改记录
     * @param entity
     */
    public void modify(T entity){
        BaseDatabase db = getDatabase();
        try{
            db.modify(entity);
        }finally {
            db.close();
        }
    }

    /**
     * 根据entity的id修改,修改后根据restrains查询数量,如果数量大于1则放弃修改并抛出异常
     * @param entity
     * @param errMsg
     * @param restrains
     */
    public void modify(T entity, String errMsg, Restrain... restrains){
        BaseDatabase db = getDatabase();
        try{
            boolean ret = db.modify(entity,1,restrains);
            if(!ret){
                throw new MyException(errMsg);
            }
        }finally {
            db.close();
        }
    }

    public int modifys(T entity,Restrain... restrains){
        BaseDatabase db = getDatabase();
        try{
            return db.modifys(entity,restrains);
        }finally {
            db.close();
        }
    }

    public int total(String sql,Object... paramValues){
        BaseDatabase db = getDatabase();
        try{
            return db.total(sql,paramValues);
        }finally {
            db.close();
        }
    }
    public int total(Restrain... restrains){
        BaseDatabase db = getDatabase();
        try{
            return db.total(entityClass,restrains);
        }finally {
            db.close();
        }
    }

    protected int execute(String sql,Object... paramValues){
        BaseDatabase db = getDatabase();
        try{
            return db.execute(sql,paramValues);
        }finally {
            db.close();
        }
    }


    public void delById(int id){
        BaseDatabase db = getDatabase();
        try {
            db.delById(entityClass, id);
        }finally {
            db.close();
        }
    }


  /*  public int delByIds(int[] ints){
        BaseDatabase db = getDatabase();
        try {
            
        }finally {
            db.close();
        }
    }*/
}
