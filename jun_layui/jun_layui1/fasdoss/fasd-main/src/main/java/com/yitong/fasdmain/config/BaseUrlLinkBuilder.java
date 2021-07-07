package com.yitong.fasdmain.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.linkbuilder.StandardLinkBuilder;

import java.util.Map;

@Component
public class BaseUrlLinkBuilder extends StandardLinkBuilder {

    private String baseUrl;
    @Autowired
    ServerProperties serverProperties;

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    @Override
    protected String computeContextPath(IExpressionContext context, String base, Map <String, Object> parameters) {

        if (baseUrl == null) {
            baseUrl = serverProperties.getServlet().getContextPath();
        }

        return baseUrl;
    }

}
