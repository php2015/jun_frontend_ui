package com.controller;

import com.alibaba.fastjson.JSONObject;
import com.entity.User;
import com.ex.ErrorException;
import com.ex.MyException;
import com.util.StringUtil;
import com.vo.QueryPageVO;
import top.appx.easysql.Restrain;
import top.appx.easysql.data.PageInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by john on 2015/11/21.
 */
public class BaseController<T> {

    protected final Class<T> entityClass;
    public BaseController(){
        //region 获得泛型的类型
        Type genType  =getClass().getGenericSuperclass();
        Type[] params = ((ParameterizedType) genType ).getActualTypeArguments();
        entityClass = (Class) params[0];
        //endregion 获得泛型的类型
    }
    protected T requestEntity(HttpServletRequest request){
        try {
            Method[] methods = entityClass.getMethods();
            T entity = entityClass.newInstance();
            for (Method method : methods) {
                if (!method.getName().startsWith("set")|| method.getParameterTypes().length != 1) {
                    continue;
                }

                String paramName = method.getName().substring(3);
                paramName = (paramName.charAt(0) + "").toLowerCase() + paramName.substring(4);

                String valueStr = request.getParameter(paramName);
                if (valueStr == null) {
                    continue;
                }
                Object value = null;
                Class<?> type = method.getParameterTypes()[0];
                if (type.equals(String.class)) {
                    value = request.getParameter(paramName);
                } else if (type.equals(Integer.class)) {
                    if (valueStr.length() != 0) {
                        value = Integer.parseInt(valueStr);
                    }
                } else if (type.equals(Timestamp.class)) {
                    if (valueStr.length() != 0) {
                        value = Timestamp.parse(valueStr);
                    }
                }
                if (value != null) {
                    method.invoke(entity, value);
                }
            }
            return entity;
        }catch (Exception ex){
            throw new ErrorException(ex);
        }

    }

    protected T requestModel(HttpServletRequest request){
        String modelStr = request.getParameter("model");
        T model = JSONObject.parseObject(modelStr,entityClass);
        return model;
    }
    protected QueryPageVO requestQueryPageVO(HttpServletRequest request){
        int page = 1;
        int pageSize = 20;
        try{
            page = Integer.parseInt(request.getParameter("page"));
        }catch (Exception ex){
        }
        try{
            pageSize = Integer.parseInt(request.getParameter("rows"));
        }catch (Exception ex){

        }
        QueryPageVO result = new QueryPageVO();
        result.setPage(page);
        result.setPageSize(pageSize);
        Method[] methods = entityClass.getMethods();
        for(Method method:methods){
            if(method.getName().toLowerCase().equals("getid")){
                continue;
            }
            if (method.getName().toLowerCase().equals("getclass") || !method.getName().startsWith("get") ||method.getName().length()<4|| method.getParameterTypes().length != 0) {
                continue;
            }
            String name = (method.getName().charAt(3)+"").toLowerCase()+method.getName().substring(4);
            String value = request.getParameter(name);
            if(StringUtil.isNullOrEmpaty(value)){
                continue;
            }
            Type retunType = method.getReturnType();
            if(retunType.equals(String.class)){
                result.getRestrainList().add(Restrain.like(name,"%"+value+"%"));
            }

            else if(retunType.equals(Integer.class)){
                result.getRestrainList().add(Restrain.eq(name,value));
            }
        }
        return result;
    }

    protected List<Integer> requestIds(HttpServletRequest request){
        String idsStr = request.getParameter("ids");
        String[] idsStrs = idsStr.split(",");
        List<Integer> result = new ArrayList<Integer>();
        for(String idStr :idsStrs){
            result.add(Integer.parseInt(idStr));
        }
        return result;
    }
    protected void setSessionUser(HttpSession session, User user){
        session.setAttribute("user", user);
    }
    protected User getSessionUser(HttpSession session){
        Object userObj = session.getAttribute("user");
        if(userObj !=null){
            return (User)userObj;
        }else{
            return null;
        }
    }
    protected User getSessionUserThrowExIfNotExist(HttpSession session){
        Object userObj = session.getAttribute("user");
        if(userObj !=null){
            return (User)userObj;
        }else{
            throw new MyException("当前用户没有登录");

        }
    }


}
