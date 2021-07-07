package com.jeasy.collection;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class MapExUtils {

    public static String toString(Map<String, String> map, String separator) {
        if (map == null || map.size() <= 0) {
            return StringUtils.EMPTY;
        }
        StringBuilder buffer = new StringBuilder();
        int i = 0;
        for (Map.Entry<String, String> entry : map.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            if (value == null) {
                value = "";
            }
            if (i != 0) {
                buffer.append(separator);
            }
            buffer.append(key).append("=").append(value);
            i++;
        }
        return buffer.toString();
    }

    public static Map<String, String> fromString(String inputStr, String separator) {
        Map<String, String> map = new HashMap<>();
        if (inputStr != null && inputStr.length() > 0) {
            int ampersandIndex, lastAmpersandIndex = 0;
            String subStr, param, value;
            String[] paramPair;
            do {
                ampersandIndex = inputStr.indexOf(separator, lastAmpersandIndex) + 1;
                if (ampersandIndex > 0) {
                    subStr = inputStr.substring(lastAmpersandIndex, ampersandIndex - 1);
                    lastAmpersandIndex = ampersandIndex;
                }
                else {
                    subStr = inputStr.substring(lastAmpersandIndex);
                }
                paramPair = subStr.split("=", 2);
                param = paramPair[0];
                value = paramPair.length == 1 ? "" : paramPair[1];
                if (value == null) {
                    value = "";
                }
                map.put(param, value);
            } while (ampersandIndex > 0);
        }
        return map;
    }

	public static Object toBean(Class type, Map map) throws IntrospectionException, IllegalAccessException, InstantiationException, InvocationTargetException {
		BeanInfo beanInfo = Introspector.getBeanInfo(type); // 获取类属性
		Object obj = type.newInstance(); // 创建 JavaBean 对象

		// 给 JavaBean 对象的属性赋值
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (int i = 0; i < propertyDescriptors.length; i++) {
			PropertyDescriptor descriptor = propertyDescriptors[i];
			String propertyName = descriptor.getName();
			if (map.containsKey(propertyName)) {
				String propertyTypeName = descriptor.getPropertyType().getSimpleName();

				Object[] args = new Object[1];
				Object value = map.get(propertyName);

				if (propertyTypeName.equalsIgnoreCase("long")) {
					args[0] = Long.valueOf(String.valueOf(value));
				} else if (propertyTypeName.equalsIgnoreCase("int")) {
					args[0] = Integer.valueOf(String.valueOf(value));
				} else if (propertyTypeName.equalsIgnoreCase("double")) {
					args[0] = Double.valueOf(String.valueOf(value));
				} else if (propertyTypeName.equalsIgnoreCase("float")) {
					args[0] = Float.valueOf(String.valueOf(value));
				} else if (propertyTypeName.equalsIgnoreCase("short")) {
					args[0] = Short.valueOf(String.valueOf(value));
				} else if (propertyTypeName.equalsIgnoreCase("byte")) {
					args[0] = Byte.valueOf(String.valueOf(value));
				} else {
					args[0] = value;
				}

				descriptor.getWriteMethod().invoke(obj, args);
			}
		}
		return obj;
	}

	public static Map<String, Object> toObjMap(Object bean) {
		Class type = bean.getClass();
		Map<String, Object> returnMap = new HashMap<>();
		BeanInfo beanInfo;

		try {
			beanInfo = Introspector.getBeanInfo(type);
		} catch (IntrospectionException e) {
			return returnMap;
		}

		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (int i = 0; i < propertyDescriptors.length; i++) {
			PropertyDescriptor descriptor = propertyDescriptors[i];
			String propertyName = descriptor.getName();
			if (!propertyName.equals("class")) {
				Method readMethod = descriptor.getReadMethod();
				Object result = null;
				try {
					result = readMethod.invoke(bean, new Object[0]);
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					returnMap.put(propertyName, result);
				}
			}
		}
		return returnMap;
	}

	public static Map<String, String> toStrMap(Object bean) {
		Class type = bean.getClass();
		Map<String, String> returnMap = new HashMap<>();
		BeanInfo beanInfo;

		try {
			beanInfo = Introspector.getBeanInfo(type);
		} catch (IntrospectionException e) {
			e.printStackTrace();
			return returnMap;
		}

		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (int i = 0; i < propertyDescriptors.length; i++) {
			PropertyDescriptor descriptor = propertyDescriptors[i];
			String propertyName = descriptor.getName();
			if (!propertyName.equals("class")) {
				Method readMethod = descriptor.getReadMethod();
				Object result = null;
				try {
					result = readMethod.invoke(bean, new Object[0]);
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (result != null) {
					returnMap.put(propertyName, result.toString());
				} else {
					returnMap.put(propertyName, "");
				}
			}
		}
		return returnMap;
	}
}
