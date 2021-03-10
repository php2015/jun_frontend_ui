/*
 *    Copyright 2010-2015 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package com.itmuch.react.config.autoConfig.shiro;

import com.google.common.collect.Maps;
import org.apache.shiro.mgt.DefaultSecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Import;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Configuration
@EnableConfigurationProperties(ShiroProperties.class)
@Import(ShiroManager.class)
public class ShiroAutoConfiguration {
    private static Logger log = LoggerFactory.getLogger(ShiroAutoConfiguration.class);

    @Autowired
    private ShiroProperties properties;

    @Bean(name = "realm")
    @DependsOn("lifecycleBeanPostProcessor")
    @ConditionalOnMissingBean
    public Realm realm() {
        Class<?> realmClass = properties.getRealm();
        return (Realm) BeanUtils.instantiate(realmClass);
    }


    private Map<String, AccessControlFilter> getFilterMap() {
        Map<String, Class<?>> filterMap = properties.getFilterMap();
        Map<String, AccessControlFilter> result = new HashMap<>();
        filterMap.forEach((key, clz) -> {
            AccessControlFilter instantiate = (AccessControlFilter) BeanUtils.instantiate(clz);
            result.put(key, instantiate);
        });
        return result;
    }

    @Bean(name = "shiroFilter")
    @DependsOn("securityManager")
    @ConditionalOnMissingBean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(DefaultSecurityManager securityManager, Realm realm) {
        securityManager.setRealm(realm);

        Map<String, Set<String>> filterChain = properties.getFilterChain();
        Map<String, String> filterChainDefinitionMap = this.convertToFilterChainDefinitionMap(filterChain);
        Map<String, AccessControlFilter> filterMap = this.getFilterMap();
        log.info("过滤器定义: {}, 自定义过虑器: {}, filterChainDefinitionMap = {}", filterChain, filterMap, filterChainDefinitionMap);

        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        shiroFilter.setLoginUrl(properties.getLoginUrl());
        shiroFilter.setSuccessUrl(properties.getSuccessUrl());
        shiroFilter.setUnauthorizedUrl(properties.getUnauthorizedUrl());

        shiroFilter.setFilterChainDefinitionMap(filterChainDefinitionMap);
        shiroFilter.getFilters().putAll(filterMap);

        return shiroFilter;
    }

    private Map<String, String> convertToFilterChainDefinitionMap(Map<String, Set<String>> map) {
        // key：路径，value：过滤器名称
        HashMap<String, String> ret = Maps.newHashMap();
        map.keySet()
                .forEach(key -> {
                    Set<String> value = map.get(key);

                    value.forEach(item -> ret.put(item, key));
                });
        return ret;
    }


//    /**
//     * 交换Map中的K和V
//     * @param originalMap
//     * @return
//     */
//    private <K, V> Map<V, K> swapKeyValue(Map<K, V> originalMap) {
//        Map<V, K> map = new HashMap<>();
//        for (Map.Entry<K, V> entry : originalMap.entrySet()) {
//            map.put(entry.getValue(), entry.getKey());
//        }
//
//        return map;
//    }
}
