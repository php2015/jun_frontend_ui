package com.chensi.common;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;

import com.chensi.util.PropertiesLoader;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

/**
 * 全局静态对象类
 * @author Chason
 * @version 2016-1-15 上午11:10:04
 */
public class Global
{
	/**单例设计模板（此处无任何意义）*/
	private Global(){}
	private static Global instance = null;
	public synchronized static Global getInstance() {
		if (instance == null)
			instance = new Global();
		return instance;
	}
	
	/**
	 * 保存全局属性值
	 */
	private static Map<String, String> map = Maps.newHashMap();
	
	/**
	 * 全局gson对象
	 */
	public static final Gson gson=new Gson();
	
	/**
	 * socket在线人员
	 */
	public static final Map<Integer, WebSocketSession> userSocketSessionMap=new HashMap<Integer, WebSocketSession>();;
	
	/**
	 * 属性文件加载对象
	 */
	private static PropertiesLoader propertiesLoader = new PropertiesLoader("config.properties");
	
	
	/**
	 * 获取配置
	 */
	public static String getConfig(String key) {
		String value = map.get(key);
		if (value == null){
			value = propertiesLoader.getProperty(key);
			map.put(key, value != null ? value : "");
		}
		try {
			return new String(value.getBytes("iso8859-1"),"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}
	
}
