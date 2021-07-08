package com.jeasy.json;

import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class GsonUtils {

	private GsonUtils() {
	}

	public static <T> T fromJson(String json, Class<T> clasz) {
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		return gson.fromJson(json, clasz);
	}

	public static String toJson(Object src) {
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		return gson.toJson(src);
	}

	public static String toJsonSerializeNulls(Object src) {
		Gson gson = new GsonBuilder().serializeNulls().create();
		return gson.toJson(src);
	}

	public static String get(String key, String snapshot) {
		if (StringUtils.isBlank(key) || StringUtils.isBlank(snapshot)) {
			return null;
		}
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		Map<String, String> map = null;
		try {
			map = gson.fromJson(snapshot, new TypeToken<Map<String, String>>() {
			}.getType());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (MapUtils.isEmpty(map)) {
			return null;
		}
		return map.get(key);
	}

	public static String put(String snapshot, String key, String value) {
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		Map<String, String> map = gson.fromJson(snapshot, new TypeToken<Map<String, String>>() {
		}.getType());
		map.put(key, value);
		return gson.toJson(map);
	}

	public static Map<String, String> jsonToMap(String jsonStr) {
		Gson gson = new GsonBuilder().disableHtmlEscaping().create();
		Map<String, String> objMap = null;
		if (gson != null) {
			java.lang.reflect.Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			objMap = gson.fromJson(jsonStr, type);
		}
		return objMap;
	}

	public static JSONObject stringToJSONOBject(String jsonStr) {
		JSONObject dataJson = JSONObject.parseObject(jsonStr);
		return dataJson;
	}
}
