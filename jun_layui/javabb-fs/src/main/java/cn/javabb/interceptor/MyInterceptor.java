package cn.javabb.interceptor;

import cn.javabb.util.RequestUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * 自定义拦截器
 * @Author QINB imqinbao@163.com
 * @CreateDate 2019/1/11/011 17:53
 * @Since V1.0
 */
@Slf4j
@Component
public class MyInterceptor implements HandlerInterceptor {
    @Value("${app.allowIps}")
    private String allowIps;

    private static final String USER_AGENT = "user-agent";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 如果白名单为空就直接返回
        if(null == allowIps){
            return true;
        }

        String realIp = RequestUtil.getIp();
        log.info("USER REAL IP IS : {}.",realIp);
        /*if(allowIps.indexOf(realIp)>-1){
            String uri = request.getRequestURI();
            log.debug("用户访问地址: {}, 来路地址: {}", uri, RequestUtil.getIp());
            return true;
        }else{
            log.debug("无权访问");
            PrintWriter writer = null;
            response.setContentType("text/html;charset=UTF-8");
            writer = response.getWriter();
            writer.write("<!doctype html><title>403 Not Allowed</title><h1 style=\"text-align: center\">403 Not Allowed</h1><hr/><p style=\"text-align: center\">Javabb File Server</p>");
            writer.flush();
        }*/
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
