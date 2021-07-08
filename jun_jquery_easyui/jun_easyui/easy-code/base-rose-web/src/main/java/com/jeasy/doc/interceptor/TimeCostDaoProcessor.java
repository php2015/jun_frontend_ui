package com.jeasy.doc.interceptor;

import org.apache.commons.lang3.StringUtils;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.aop.support.NameMatchMethodPointcutAdvisor;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

import com.jeasy.doc.util.MonitorUtils;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * BeanPostProcessor, 对所有符合rose框架的DAO织入一段统计代码
 * 用于分析SQL热点、耗时等信息
 * @author taomk
 * @version 1.0
 * @since 2014/9/17 10:26
 */
@Slf4j
public class TimeCostDaoProcessor implements BeanPostProcessor {

	@Setter
	private TimeCostDaoInterceptor interceptor;

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (StringUtils.endsWith(beanName, MonitorUtils.DAO_CLASS)) {
            Class<?> beanClass = bean.getClass();
            Class<?>[] interfaceClasses = beanClass.getInterfaces();
            if (interfaceClasses.length == 1) {
                ProxyFactory weaver = new ProxyFactory(interfaceClasses);
                NameMatchMethodPointcutAdvisor advisor = new NameMatchMethodPointcutAdvisor();
                advisor.addMethodName("*");
                advisor.setAdvice(interceptor);
                weaver.addAdvisor(advisor);
                weaver.setTarget(bean);
                return weaver.getProxy();
            }
        }
        return bean;
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
}
