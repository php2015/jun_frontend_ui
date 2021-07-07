package cn.javabb.config;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.javabb.interceptor.MyInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import javax.annotation.Resource;

/**
 * @Author QINB imqinbao@163.com
 * @CreateDate 2019/1/11/011 18:36
 * @Since V1.0
 */
@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Resource
    private MyInterceptor myInterceptor;
    @Value("${app.allowDomain}")
    private String allowDomains;
    /**
     * @param registry 配置静态资源放行
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }



    /**
     * @param registry 添加拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加自定义处理器
        InterceptorRegistration interceptorRegistration = registry.addInterceptor(myInterceptor);
        //排除配置
        interceptorRegistration.excludePathPatterns("/assets/**");
        //配置拦截策略
        interceptorRegistration.addPathPatterns("/**");
    }

    /**
     * 网站跨域配置
     * @param registry
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println(allowDomains.split(";").length);
        registry.addMapping("/**")
                .allowedOrigins(allowDomains.split(";"))
                .allowCredentials(true)
                .allowedMethods("GET", "POST", "DELETE", "PUT","PATCH")
                .maxAge(3600);
    }
}
