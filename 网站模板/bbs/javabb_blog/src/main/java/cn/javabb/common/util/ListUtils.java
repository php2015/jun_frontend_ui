package cn.javabb.common.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import cn.javabb.content.entity.Blog;

public class ListUtils {

	/**
	 * 将数组转换为制定字符串隔开的字符串。
	 * 
	 * @param array
	 *            数组
	 * @param split
	 *            分割符
	 * @return
	 */
	public static String arrayToString(int[] array, String split) {
		if (array == null || array.length == 0)
			return "";
		String result = "";
		for (int i = 0; i < array.length - 1; i++)
			result += array[i] + split;
		result += array[array.length - 1];
		return result;
	}

	/**
	 * 将集合转换为制定字符串隔开的字符串。
	 * 
	 * @param array
	 *            数组
	 * @param split
	 *            分割符
	 * @return
	 */
	public static String listToString(List list, String split) {
		if (list == null)
			return "";
		Object[] array = list.toArray(new Object[list.size()]);
		return arrayToString(array, split);
	}

	/**
	 * 将数组转换为制定字符串隔开的字符串。
	 * 
	 * @param array
	 *            数组
	 * @param split
	 *            分割符
	 * @return
	 */
	public static String arrayToString(Object[] array, String split) {
		return arrayToString(array, split, null);
	}

	/**
	 * 将数组转换为制定字符串隔开的字符串。
	 * 
	 * @param array
	 *            数组
	 * @param split
	 *            分割符
	 * @return
	 */
	public static String arrayToString(Object[] array, String split, String valueWrapper) {
		if (array == null || array.length == 0)
			return "";
		String result = "", strWrapper = (valueWrapper == null ? "" : valueWrapper);
		for (int i = 0; i < array.length - 1; i++)
			result += strWrapper + array[i] + strWrapper + split;
		result += strWrapper + array[array.length - 1] + strWrapper;
		return result;
	}

	/**
	 * List类型转换为数组类型String[]
	 * 
	 * @param a
	 * @return
	 */
	public static String[] listToArrayString(List<String> a) {
		if (a != null && a.size() > 0) {
			String[] temZ = new String[a.size()];
			a.toArray(temZ);
			return temZ;
		} else {
			return null;
		}
	}
	
	public static List<String> stringToListString(String str){
	    if(BUtil.isNull(str)){
	        return new ArrayList<String>();
	    }
		return Arrays.asList(str.split(","));
	}
	public static List<Object> stringToListObject(String str){
	    if(BUtil.isNull(str)){
            return new ArrayList<Object>();
        }
		return Arrays.asList(str.split(","));
	}
	
	/**
	 * 
	 * Description: 
	 * 判断集合是否为空
	 * @author 
	 * @param list
	 * @return
	 */
	public static boolean isEmpty(List<?> list) {
        return list == null || list.isEmpty();
    }
	/**
	 * 
	 * Description: 
	 *  判断集合是否为非空
	 * @author 
	 * @param list
	 * @return
	 */
    public static boolean isNotEmpty(List<?> list) {
        return !isEmpty(list);
    }
	/**
	 * Description: 
	 * 将list集合属性用逗号拼凑成string
	 * @author 
	 * @param list
	 * @param property
	 * @return
	 */
    public static String getListfieldString(List<?> list, String property) {
        if (isEmpty(list)) {
            return null;
        }
        StringBuffer joinStr = new StringBuffer();
        for (Object object : list) {
            Object value = ObjectUtil.invokeGetMethod(object, property);

            joinStr.append(value).append(",");
        }
        
        return joinStr.substring(0, joinStr.length() - 1);
    }
    /**
     * 
     * Description: 
     * 将List实体的属性封装成一个List<String> 
     * @author 
     * @param list
     * @param property
     * @return
     */
    public static List<String> getfieldList(List<?> list,String property){
        return stringToListString(getListfieldString(list, property));
    } 
    
    /**
     * Description: 根据属性值查找集合对象， 只返回第一个匹配到的对象 <br>
     * 
     * @author qinb<br>
     * @param list 查询集合
     * @param property 属性名
     * @param value 属性值
     * @return <br>
     */
    public static <T> T getItemByField(List<T> list, String property, Object value) {
        if (isEmpty(list)) {
            return null;
        }
        for (T t : list) {
            if (t == null) {
                continue;
            }

            Object val = ObjectUtil.invokeGetMethod(t, property);
            if (value == val) {
                return t;
            }

            if (value != null && value.equals(val)) {
                return t;
            }
        }
        return null;
    }

    /**
     * Description: 获取属性值集合并去重， <br>
     * 
     * @author qinb<br>
     * @param list
     * @param property
     * @return <br>
     */
    public static Set<Object> getPropertyValueSet(List<?> list, String property) {
        Set<Object> valSet = new HashSet<Object>();
        for (Object obj : list) {
            valSet.add(ObjectUtil.invokeGetMethod(obj, property));
        }
        return valSet;
    }


    /**
     * Description: list转成Map <br>
     * 
     * @author qinb
     * @param list List对象
     * @param keyProperty 做为Map的key属性名
     * @return
     */
    public static <T> Map<String, T> listToMap(List<T> list, String keyProperty) {
        Map<String, T> tempMap = new HashMap<String, T>();
        for (T t : list) {
            String key = String.valueOf(ObjectUtil.invokeGetMethod(t, keyProperty));
            tempMap.put(key, t);
        }
        return tempMap;

    }

    /**
     * Description: List分组<br>
     * 
     * @author qinb <br>
     * @param list 源集合
     * @param property 分组字段， 值必须是String类型
     * @return <br>
     */
    public static <T> Map<String, List<T>> listGroup(List<T> list, String property) {
        Map<String, List<T>> resultMap = new HashMap<String, List<T>>();
        for (T t : list) {
            Object key = ObjectUtil.invokeGetMethod(t, property);
            List<T> groupList = null;
            if (resultMap.containsKey(key)) {
                groupList = resultMap.get(key);
            }
            else {
                groupList = new ArrayList<T>();
                resultMap.put(String.valueOf(key), groupList);
            }
            groupList.add(t);
        }

        return resultMap;
    }

    /**
     * Description: 连接属性值逗号分割
     * 
     * @author qinb
     * @param list
     * @param property
     * @return
     */
    public static String join(List<?> list, String property) {
        if (isEmpty(list)) {
            return null;
        }
        StringBuffer joinStr = new StringBuffer();
        for (Object object : list) {
            Object value = ObjectUtil.invokeGetMethod(object, property);

            joinStr.append(value).append(",");
        }
        
        return joinStr.substring(0, joinStr.length() - 1);
    }
    
    public static void main(String[] args) {
        Blog blog = new Blog();
        blog.setTitle("aaa");
        Blog blog1 = new Blog();
        blog1.setTitle("bbb");
        Blog blog2 = new Blog();
        blog2.setTitle(null);
        List<Blog> blogList = new ArrayList<>();
        blogList.add(blog1);
        blogList.add(blog);
        blogList.add(blog2);
        System.out.println(getfieldList(blogList,"title"));
        System.out.println(listToMap(blogList,"title"));
        System.out.println(listGroup(blogList,"title"));
    }
    
}
