
package com.itmuch.react.config.autoConfig.shiro;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;
import java.util.Set;

/**
 * Configuration properties for Shiro.
 */
@ConfigurationProperties(prefix = "shiro")
@Data
public class ShiroProperties {
    /**
     * Custom Realm
     */
    private Class<?> realm;
    /**
     * URL of login
     */
    private String loginUrl;
    /**
     * URL of success
     */
    private String successUrl;
    /**
     * URL of unauthorized
     */
    private String unauthorizedUrl;
    /**
     * filter chain，key是权限，value是路径
     * 示例：key:authc    value:[/**, /users/**]
     */
    private Map<String, Set<String>> filterChain;

    private Map<String, Class<?>> filterMap;
}
