package cn.javabb.common.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

import cn.javabb.sys.entity.User;

public class ObjectUtil {

    /**
     * Description: 获取对象属性值<br>
     * 
     * @author QINB<br>
     * @param obj 对象
     * @param property 属性名
     * @return <br>
     */
    public static Object invokeGetMethod(Object obj, String property) {
        Class<?> clazz = obj.getClass();
        try {
            if (obj instanceof Map) {
                return ((Map) obj).get(property);
            }
            PropertyDescriptor pd = new PropertyDescriptor(property, clazz);
            Method getMethod = pd.getReadMethod();
            return getMethod.invoke(obj);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Description: 调用对象Set方法设置属性值
     * 
     * @author QINB
     * @param obj
     * @param property
     * @param value
     */
    public static void invokeSetMethod(Object obj, String property, Object value) {
        try {
            if (value == null) {
                return;
            }
            if (obj instanceof Map) {
                ((Map) obj).put(property, value);
                return;
            }
            Class<?> clazz = obj.getClass();
            PropertyDescriptor pd = new PropertyDescriptor(property, clazz);
            Method setMethod = pd.getWriteMethod();// 获得get方法

            if (setMethod != null) {
                Field field = clazz.getDeclaredField(property);
                String type = field.getType().getName();
                if (type.equals("java.util.Date")) {
                    setMethod.invoke(obj, (Date) obj);
                }
                else if (type.equals("java.lang.Integer")) {
                    setMethod.invoke(obj, Integer.parseInt(String.valueOf(value)));
                }
                else if (type.equals("java.lang.Long")) {
                    setMethod.invoke(obj, Long.parseLong(String.valueOf(value)));
                }
                else {
                    setMethod.invoke(obj, String.valueOf(value));
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Description: 动态调用对象方法
     * 
     * @author QINB
     * @param instance 对象实例
     * @param methodName 方法名
     * @param params 参数
     * @return
     * @throws Exception
     */
    public static Object invoke(Object instance, String methodName, Object... params) throws Exception {
        try {
            if (methodName == null) {
                return null;
            }
            Class<?> cls = instance.getClass();
            Class<?>[] parameterTypes = null;
            if (params != null && params.length > 0) {
                parameterTypes = new Class[params.length];
                for (int i = 0; i < params.length; i++) {
                    Object obj = params[i];

                    parameterTypes[i] = obj.getClass();
                }
            }
            Method method = cls.getMethod(methodName, parameterTypes);
            return method.invoke(instance, params);
        }
        catch (Exception e) {
           e.printStackTrace();
           throw e;
        }
    }
    
}
