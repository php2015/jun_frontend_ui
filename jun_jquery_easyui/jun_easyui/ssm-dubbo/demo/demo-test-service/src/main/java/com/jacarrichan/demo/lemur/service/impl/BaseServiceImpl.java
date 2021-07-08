package com.jacarrichan.demo.lemur.service.impl;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.LinkedHashSet;
import java.util.Set;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.BeansException;
import org.springframework.beans.TypeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.DependencyDescriptor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.ResolvableType;
import org.springframework.util.ReflectionUtils;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.common.service.impl.CommonServiceImpl;
import com.jacarrichan.demo.lemur.service.BaseService;

@Slf4j
public abstract class BaseServiceImpl<E extends Serializable, PK> extends
		CommonServiceImpl<E, PK> implements BaseService<E, PK>,
		ApplicationContextAware {

	public ApplicationContext applicationContext;

	/*	打算实现范型限定注入的，结果没实现
	@Autowired
	private ConfigurableListableBeanFactory beanFactory;

	@Override
	public BaseMapper<E, PK> getMapper() {
		// vo转po
		String voName = entityClass.getName();
		// 约定 vo与po的包名严格一致，且类名非后缀也严格一致，两者不同部分就是一个以Vo结尾，一个一Po结尾
		String poName = (voName + "~").replace("Vo~", "Po");
		Class poCls = null;
		try {
			poCls = Class.forName(poName);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			System.exit(-1);
		}
		log.debug("po class info: {}", poCls);
		ResolvableType poRt = ResolvableType.forClassWithGenerics(
				BaseMapper.class, poCls, pkClass);
		Class cls = poRt.resolve();
		Field field=ReflectionUtils.findField(cls, "");
		// ------------------------------
		DependencyDescriptor desc = new DependencyDescriptor(field, true);
		desc.setContainingClass(this.getClass());
		Set<String> autowiredBeanNames = new LinkedHashSet<String>(1);
		TypeConverter typeConverter = beanFactory.getTypeConverter();
		Object value = beanFactory.resolveDependency(desc, "",
				autowiredBeanNames, typeConverter);
		// ------------------------------
		return applicationContext.getBean(cls);
	}
*/
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}
}
