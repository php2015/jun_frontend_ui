//package com.itmuch.react.security.auth;
//
//import com.itmuch.react.core.convert.AjaxResult;
//import com.itmuch.react.core.mapper.JsonMapper;
//import lombok.Getter;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.AuthenticationToken;
//import org.apache.shiro.authc.UsernamePasswordToken;
//import org.apache.shiro.subject.Subject;
//import org.apache.shiro.web.filter.authc.AuthenticatingFilter;
//import org.apache.shiro.web.util.WebUtils;
//
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import java.io.IOException;
//
//@Slf4j
//@Getter
//public class AjaxSupportedAuthenticationFilter extends AuthenticatingFilter {
//    private String usernameParam = "username";
//    private String passwordParam = "password";
//    private String rememberMeParam = "rememberMe";
//
//    @Override
//    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
//        return false;
//    }
//
//    @Override
//    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
//        return executeLogin(request, response);
//    }
//
//    @Override
//    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) throws Exception {
//        String username = WebUtils.getCleanParam(request, this.getUsernameParam());
//        String password = WebUtils.getCleanParam(request, this.getPasswordParam());
//        boolean rememberMe = WebUtils.isTrue(request, this.getRememberMeParam());
//        String host = this.getHost(request);
//
//        return new UsernamePasswordToken(username, password, rememberMe, host);
//    }
//
//    @Override
//    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
//                                     ServletResponse response) throws Exception {
//        return true;
//    }
//
//    @Override
//    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException ae, ServletRequest request,
//                                     ServletResponse response) {
//        AjaxResult<Object> success = new AjaxResult<>()
//                .error("401", "登录失败！");
//        try {
//            response.setCharacterEncoding("UTF-8");
//            response.setContentType("application/json; charset=utf-8");
//            response.getWriter()
//                    .write(
//                            JsonMapper.defaultMapper()
//                                    .toJson(success)
//                    );
//        } catch (IOException e) {
//            log.error("发生异常。", e);
//        }
//        return false;
//    }
//
//}
