package com.framework.filter;

import com.alibaba.fastjson.JSONObject;
import com.ex.MyException;
import com.framework.InitMethod;
import com.framework.annotation.Action;
import com.framework.annotation.Controller;
import com.vo.ResultVO;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import static com.framework.InitMethod.controllerList;
import static com.vo.ResultVO.error;
import static com.vo.ResultVO.success;

/**
 * Created by john on 2015/12/10.
 */
public class MainFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("init");
        try {
            InitMethod.init();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest)servletRequest;
        HttpServletResponse resp = (HttpServletResponse)servletResponse;
        String path = req.getServletPath();
        if(!path.endsWith(".do")){
            filterChain.doFilter(servletRequest,servletResponse);
            return;
        }
        path = path.substring(0,path.indexOf("."));

        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        PrintWriter out = resp.getWriter();

        String action = req.getParameter("action");
        Method method = null;
        List<Object> paramValues = new ArrayList<Object>();
        Class c = null;
        Object obj = null;
        for(Object obj1 :controllerList){
            Class c1 = obj1.getClass();
            if(c1.isAnnotationPresent(Controller.class)){
                Controller controller = (Controller)c1.getAnnotation(Controller.class);
                for(String str:controller.value()){
                    if(str.equals(path)){
                        c = c1;
                        obj = obj1;
                        break;
                    }
                    if(c!=null){
                        break;
                    }
                }
            }
        }
        if(c == null){
            out.print(JSONObject.toJSONString(error("not found the path:"+path)));
            return;
        }


        boolean isExist = c.isAnnotationPresent(Controller.class);
        if(isExist){
            Method[] methods = c.getMethods();
            for(Method method1 : methods){
                System.out.print(method1.isAccessible());
                System.out.println(method1.getName());
                if(method1.isAnnotationPresent(Action.class)){
                    Action action1 = (Action)method1.getAnnotation(Action.class);
                    if(action1.value().equals(action)){
                        method = method1;
                        break;
                    }
                }
            }
        }

        if(method == null){
            out.print(JSONObject.toJSONString(ResultVO.error("not found the action:"+action)));
            return;
        }



        Parameter[] ps = method.getParameters();
        for(Parameter p :ps){
            Class type = p.getType();
            if(type.equals(String.class)){
                paramValues.add(req.getParameter(p.getName()));
            }
            else if(type.equals(HttpServletRequest.class)){
                paramValues.add(req);
            }
            else if(type.equals(HttpServletResponse.class)){
                paramValues.add((resp));
            }
            else if(type.equals(HttpSession.class)){
                paramValues.add(req.getSession(true));
            }

        }


        try {
            Object obj2 = method.invoke(obj, paramValues.toArray());
            Type rt = method.getGenericReturnType();
            if(rt.getTypeName().equals("void")){
                out.print(JSONObject.toJSONString(success()));
            }
            else if(rt.equals(String.class)){
                resp.sendRedirect(obj2.toString());
            }
            else{
                if(obj2 != null){
                    String str = JSONObject.toJSONString(obj2);
                    out.print(str);
                }
            }

        }catch (IllegalAccessException e) {
            throw new ServletException(e);
        } catch (InvocationTargetException e) {
            if(e.getTargetException().getClass().equals(MyException.class)){
                out.print(JSONObject.toJSONString(ResultVO.error(e.getTargetException().getMessage())));
            }else{
                throw new ServletException(e);
            }

        }

    }

    public void destroy() {
        System.out.println("destroy");
    }
}
