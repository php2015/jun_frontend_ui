package cn.javabb.common.interceptor;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
/**
 * 错误页面拦截器
 * 替代EmbeddedServletContainerCustomizer在war中不起作用的方法
 * @author QINB
 * @CreateDate 2018年9月13日 下午4:59:58
 * @since V1.0
 * @see cn.javabb.common.interceptor
 */
@Component
public class ErrorPageInterceptor extends HandlerInterceptorAdapter {
    private List<Integer> errorCodeList = Arrays.asList(404, 403, 500, 501);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
        Exception {
        System.out.println("request statue :"+response.getStatus());
        System.out.println("request statue :"+request.getContextPath());
       if (errorCodeList.contains(response.getStatus())) {
            response.sendRedirect("/error/" + response.getStatus());
            return false;
        }
        return super.preHandle(request, response, handler);
    }
}