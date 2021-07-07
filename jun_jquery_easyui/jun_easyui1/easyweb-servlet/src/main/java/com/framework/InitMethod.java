package com.framework;

import com.framework.annotation.Autowired;
import com.framework.annotation.Controller;
import com.framework.annotation.Source;
import com.util.Utils;

import java.lang.reflect.Field;
import java.util.*;

/**
 * Created by john on 2015/12/8.
 */
public class InitMethod {
    public static void init() throws Exception {
        initSource();
        initController();
        autowired();
    }


    public static List<Object> controllerList = new ArrayList<Object>();
    public static void initController() throws Exception {
        List<Class<?>> list = Utils.getClasses("com.controller");
        for(Class<?> c1 : list){
            if(c1.isAnnotationPresent(Controller.class)){
                controllerList.add(c1.newInstance());
            }
        }
    }

    public static Map<String,Object> sourceMap = new HashMap<String, Object>();
    public static  void initSource() throws Exception {
        List<Class<?>> list = Utils.getClasses("com.dao");
        list.addAll(Utils.getClasses("com.service"));
        for(Class<?> c1 :list){
            if(!c1.isAnnotationPresent(Source.class)){
                continue;
            }
            Object obj = c1.newInstance();
            if(c1.isAnnotationPresent(Source.class)){
                Source source = (Source)c1.getAnnotation(Source.class);
                String key = source.value();
                if(key.equals("")){
                    key = c1.getSimpleName();
                    key = (key.charAt(0)+"").toLowerCase()+key.substring(1);
                }
                sourceMap.put(key,obj);
            }
        }
    }
    public static void autowired() throws Exception {
        List<Object> list = new ArrayList<Object>();
        Set<String> keySet = sourceMap.keySet();
        for(String key :keySet){
            list.add(sourceMap.get(key));
        }
        list.addAll(controllerList);

        for(Object obj:list){
            Class<?> c1 = obj.getClass();
            Field[] fields = c1.getDeclaredFields();
            for(Field field :fields){
                field.setAccessible(true);
                if(field.isAnnotationPresent(Autowired.class)){
                    Autowired autowired = (Autowired)field.getAnnotation(Autowired.class);
                    String akey = autowired.value();
                    if(akey.equals("")){
                        akey = field.getName();
                    }
                    Object obj1 = sourceMap.get(akey);
                    if(obj1 == null){
                        throw new Exception("not found the source "+akey);
                    }
                    field.set(obj,obj1);
                }
            }
        }
    }


}
