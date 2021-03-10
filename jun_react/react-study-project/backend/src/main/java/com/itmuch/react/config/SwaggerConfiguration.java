package com.itmuch.react.config;

import com.fasterxml.classmate.TypeResolver;
import com.google.common.collect.Lists;
import com.itmuch.react.core.constant.ConstantsApp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collection;
import java.util.List;

/**
 * 参考：http://www.spring4all.com/article/1381
 *
 * @author qinzhongjian
 * @date created in 2018/6/26 12:52
 * @since 1.0.0
 */
@EnableSwagger2
@Configuration
public class SwaggerConfiguration {

    @Bean
    public Docket configure(TypeResolver typeResolver) {
        Parameter parameter = new ParameterBuilder()
                .parameterType("header") //参数类型支持header, cookie, body, query etc
                .name(ConstantsApp.TOKEN_HEADER) //参数名
                .description("请输入JWT Token")
                .modelRef(new ModelRef("string"))//指定参数值的类型
                .required(false)
                .build();
        List<Parameter> parameters = Lists.newArrayList(parameter);

        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.itmuch"))
                .paths(PathSelectors.any())
                .build()
                .pathMapping("/")
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo())
                .alternateTypeRules(
                        AlternateTypeRules.newRule(
                                typeResolver.resolve(Collection.class, WildcardType.class),
                                typeResolver.resolve(List.class, WildcardType.class))
                )
                .enableUrlTemplating(true)
                .forCodeGeneration(false)
                .globalOperationParameters(parameters);
    }

    @Bean
    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("React学习项目-后台")  //标题
                .description("React学习项目-后台")  //描述
                .termsOfServiceUrl("https://github.com/itmuch")  //超链接
                .contact(new Contact("周立", "https://github.com/itmuch", "eacdy0000@126.com"))   // 联系方式
                .version("1.0")
                .license("Apache License Version 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0")
                .build();
    }
}