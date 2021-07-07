package com.jacarrichan.demo.common.service.impl;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Proxy;
import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.PostConstruct;

import lombok.extern.slf4j.Slf4j;

import org.apache.ibatis.binding.MapperProxy;
import org.springframework.beans.BeanUtils;
import org.springframework.core.ResolvableType;

import com.jacarrichan.demo.common.mapper.BaseMapper;
import com.jacarrichan.demo.common.models.Response;
import com.jacarrichan.demo.common.service.CommonService;
import com.jacarrichan.demo.common.service.query.BaseQuery;

@Slf4j
public abstract class CommonServiceImpl<E extends Serializable, PK> implements
		CommonService<E, PK> {
	protected final Class<E> entityClass;// 对应外部服务的class
	protected Class poClass;// 对应数据库的class
	protected final Class<PK> pkClass;// 主键的class

	public CommonServiceImpl() {
		ResolvableType rt = ResolvableType.forClass((Class<?>) this.getClass())
				.getSuperType();
		entityClass = (Class<E>) rt.getGeneric(0).resolve();
		pkClass = (Class<PK>) rt.getGeneric(1).resolve();
		log.trace("entityClass:{}---pkClass:{}", entityClass, pkClass);
	}

	// -------一些通用的业务逻辑请放在下面---------------
	@Override
	public Response<Integer> add(E t) {
		Serializable voBean = null;
		Serializable target = t;
		// 如果能转换就自动转换，否则上层自己转换
		if (null != poClass &&  !poClass.isAssignableFrom(t.getClass())) {
			voBean = copy(t, poClass);
		}
		if (null != voBean) {
			target = voBean;
		}
		int result = getMapper().insertSelective(target);
		return new Response<>(result);
	}

	@Override
	public Response<List<E>> findByQuery(BaseQuery query) {
		List result = getMapper().selectByQuery(query);
		return new Response<List<E>>(changeListElementType(result));
	}

	public abstract BaseMapper getMapper();

	// ---------------------------------------------

	@PostConstruct
	public void init() {
		initMapperVoType();
	}

	/**
	 * 从当前service的mapper接口范型参数中对接数据库的bean的class<br>
	 */
	protected void initMapperVoType() {
		try {
			InvocationHandler targetHandler = Proxy
					.getInvocationHandler(getMapper());
			MapperProxy mp = (MapperProxy) targetHandler;
			Field ssd = MapperProxy.class.getDeclaredField("mapperInterface");
			ssd.setAccessible(true);
			Class mapperInterface = (Class) ssd.get(mp);
			Type[] mapperTypes = mapperInterface.getGenericInterfaces();
			Type mapperVoType = null;
			if (null != mapperTypes && mapperTypes.length > 0) {
				mapperVoType = (((ParameterizedType) mapperTypes[0])
						.getActualTypeArguments()[0]);
			}
			if (null == mapperVoType) {
				log.warn(
						"{}接口上没有配置范型vo,将不能自动把(service参数对象)转换为(mapper对接数据库的对象)",
						mapperInterface);
			}
			try {
				poClass = (Class<?>) mapperVoType;
			} catch (ClassCastException e) {
				log.error("{} 上的注解应该配置在extends关键后面的类上，而不是extends关键字之前",
						mapperInterface);
				throw e;
			}
		} catch (NoSuchFieldException | SecurityException
				| IllegalArgumentException | IllegalAccessException e) {
			log.error("error", e);
		}
	}

	// -----------------------------------

	/**
	 * 将某个对象的实例转换为当前类范型的实例
	 * 
	 * @param o
	 * @return
	 */
	protected E copy(Object o) {
		E r = copy(o, entityClass);
		return r;
	}

	/**
	 * 将某个对象的实例转换为另一个对象的实例
	 * 
	 * @param o
	 *            某个对象的实例
	 * @param cls
	 *            指定的对象
	 * @return 指定的对象的实例
	 */
	public static <E> E copy(Object o, Class<E> cls) {
		if (null == o) {
			return null;
		}
		// 如果一样，那就不用反射转换了，直接返回
		if (cls.equals(o.getClass())) {
			return (E) o;
		}
		E obj = null;
		try {
			obj = cls.newInstance();
			BeanUtils.copyProperties(o, obj);
		} catch (IllegalAccessException | InstantiationException e) {
			log.error("error", e);
		}
		return obj;
	}

	/**
	 * 将list元素某个对象的实例转换为另一个对象的实例
	 * 
	 * @param o
	 *            待转换list
	 * @param cls
	 *            目标对象(指list的每个元素)
	 * @return
	 */
	public static <E> List<E> copyList(List<?> o, Class<E> cls) {
		if (null == o) {
			return null;
		}
		List<E> list = null;
		try {
			list = o.getClass().newInstance();
			for (Object object : o) {
				list.add(copy(object, cls));
			}
		} catch (IllegalAccessException | InstantiationException e) {
			log.error("error", e);
		}
		return list;
	}

	/**
	 * 转换list中元素类型
	 * 
	 * @param recordList
	 * @param cls
	 *            目标list中的元素类型
	 * @return
	 */
	protected List<E> changeListElementType(List recordList, Class cls) {
		List<E> result = copyList(recordList, cls);
		return result;
	}

	/**
	 * 转换list中元素类型为service类的泛型参数
	 * 
	 * @param recordList
	 * @return
	 */
	protected List<E> changeListElementType(List recordList) {
		return changeListElementType(recordList, entityClass);
	}
	// -----------------------------------
}
