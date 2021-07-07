package com.jeasy.env;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanDefinitionVisitor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyResourceConfigurer;
import org.springframework.util.StringValueResolver;

/**
 * 在Spring配置文件里面配置这个类，他回到DNS服务器取相应的站位符对应的信息：
 * 如： ${core_server} -> http://10.3.24.17:8080
 *
 * User: chen.qi
 * Date: 13-1-9
 * Time: 下午2:11
 */
public class EnvPropConfigurer extends PropertyResourceConfigurer
        implements BeanNameAware, BeanFactoryAware {

    private BeanFactory beanFactory;
    private String beanName;

    private static final String SERVER_NAME = "server_name";

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    @Override
    public void setBeanName(String name) {
        this.beanName = name;
    }

    @Override
    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props) throws BeansException {
        StringValueResolver stringValueResolver = new EnvStringValueResolver();
        BeanDefinitionVisitor visitor = new BeanDefinitionVisitor(stringValueResolver);
        String[] beanNames = beanFactory.getBeanDefinitionNames();
        for (String name : beanNames) {
            if (!StringUtils.equals(name, this.beanName) && beanFactory.equals(this.beanFactory)) {
                BeanDefinition bd = beanFactory.getBeanDefinition(name);
                try {
                    visitor.visitBeanDefinition(bd);
                }
                catch (BeanDefinitionStoreException ex) {
                    throw new BeanDefinitionStoreException(bd.getResourceDescription(), name, ex.getMessage());
                }
            }
        }
    }


    private class EnvStringValueResolver implements StringValueResolver {


        public String resolveStringValue(String strVal) throws BeansException {
            String value = parseStringValue(strVal);
            return StringUtils.isBlank(value) ? null : value;
        }

        private String parseStringValue(String strVal) {
            if (StringUtils.startsWith(strVal, "$[") && StringUtils.endsWith(strVal, "]")) {
                String placeholder = StringUtils.remove(strVal, "$[");
                placeholder = StringUtils.remove(placeholder, "]");
                return resolvePlaceholder(placeholder);
            } else {
                return strVal;
            }
        }

        private String resolvePlaceholder(String placeholder) {

            //  从本地的property里面取
            String resolveVal = System.getProperty(placeholder);
            if (StringUtils.isBlank(resolveVal)) {
                if (StringUtils.equalsIgnoreCase(placeholder, SERVER_NAME)) {
                    // 如果是server_name，在property等于空的情况下，从hostname取
                    try {
                        return InetAddress.getLocalHost().getHostName();
                    } catch (UnknownHostException e) {
                        logger.error("InetAddress.getLocalHost() error", e);
                    }
                    return StringUtils.EMPTY;
                } else {
                    // 从远程取
                    if (StringUtils.isBlank(resolveVal)) {
                        resolveVal = StringUtils.join(ServerMapper.getInstance().getUrls(placeholder), ",");
                    }
                }
            }

            return resolveVal;
        }
    }
}
