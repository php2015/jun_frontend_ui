package cn.javabb.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import cn.javabb.common.interceptor.ErrorPageInterceptor;
import cn.javabb.sys.service.SysConfigService;

@Configuration
public class WebConfigurer extends WebMvcConfigurerAdapter{

    @Autowired
    SysConfigService sysConfigService;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //映射图片保存静态地址,将imgUploadPath里面的图片 通过/picture/来访问
        System.out.println("图片虚拟路径配置："+sysConfigService.querySysValueByCode("pictureUploadPath"));
        //registry.addResourceHandler("/picture/**").addResourceLocations("file:/"+sysConfigService.querySysValueByCode("pictureUploadPath"));
        registry.addResourceHandler("/picture/**").addResourceLocations("file:///"+sysConfigService.querySysValueByCode("pictureUploadPath"));
      //将templates目录下的CSS、JS文件映射为静态资源，防止Spring把这些资源识别成thymeleaf模版
        registry.addResourceHandler("/templates/**.js").addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/templates/**.css").addResourceLocations("classpath:/templates/");
        super.addResourceHandlers(registry);
    }
    
    
    /**
     * 添加错误页面拦截器
     * Description: 
     *  
     * @author QINB 
     * @param registry
     */
    public void addInterceptors(InterceptorRegistry registry) {
       // registry.addInterceptor(new ErrorPageInterceptor());//.addPathPatterns("/admin/**", "/mine/**");默认所有
        //super.addInterceptors(registry);
    }
}
