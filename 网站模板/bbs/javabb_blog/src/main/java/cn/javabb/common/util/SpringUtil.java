package cn.javabb.common.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.stereotype.Component;

import tk.mybatis.mapper.common.Mapper;
@Component
public final class SpringUtil implements BeanFactoryPostProcessor {

	
	private static ConfigurableListableBeanFactory beanFactory; // Spring应用上下文环境

	@Override
	public void postProcessBeanFactory(
			ConfigurableListableBeanFactory beanFactory) throws BeansException {
		SpringUtil.beanFactory = beanFactory;
	}
	
	
	@SuppressWarnings("unchecked")
	public static <T> Mapper<T> getMapperBean(Class<T> c) {
		String classNm = c.getName();
		return (Mapper<T>) getMapperBean(classNm);
	}
	@SuppressWarnings("unchecked")
	public static <T> Mapper<T> getMapperBean(String classNm) {
		String entityStr = classNm.substring(classNm.lastIndexOf(".")+1);
		entityStr = entityStr.substring(0, 1).toLowerCase()+entityStr.substring(1);
		return (Mapper<T>) getBeanStr(entityStr + "Mapper");
	}

	/**
	 * 获取对象
	 *
	 * @param name
	 * @return Object 一个以所给名字注册的bean的实例
	 * @throws org.springframework.beans.BeansException
	 *
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) throws BeansException {
		return (T) beanFactory.getBean(name); 
	}

	/**
	 * 获取类型为requiredType的对象
	 *
	 * @param clz
	 * @return
	 * @throws org.springframework.beans.BeansException
	 *
	 */
	public static <T> T getBean(Class<T> clz) throws BeansException {
		@SuppressWarnings("unchecked")
		T result = (T) beanFactory.getBean(clz);
		return result;
	}
	@SuppressWarnings("unchecked")
	public final static <T> T getBeanStr(String beanName) {
		String str = beanName;
		return (T) getBean(str);
	}
	
	
}
