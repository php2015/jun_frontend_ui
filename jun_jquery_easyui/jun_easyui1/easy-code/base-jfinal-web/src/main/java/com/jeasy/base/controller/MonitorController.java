package com.jeasy.base.controller;

import com.jeasy.util.MonitorUtils;
import com.jfinal.aop.Before;
import com.jfinal.aop.Clear;
import com.jfinal.ext.interceptor.GET;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
public class MonitorController extends ControllerSupport {

	@Clear
	@Before(GET.class)
	public void index() {
		render("monitor.jsp");
	}

	@Before(GET.class)
	public void report() {
		String type = getPara("type");
		Map<String, Object> result = new HashMap<>();
		List<Map<String, String>> items = new ArrayList<>();

		ConcurrentHashMap<String, AtomicLong> timeMap = null;
		ConcurrentHashMap<String, AtomicLong> countMap = null;

		if (type.equals("controller")) {
			timeMap = MonitorUtils.controllerTimeMap;
			countMap = MonitorUtils.controllerCountMap;
		} else if (type.equals("service")) {
			timeMap = MonitorUtils.serviceTimeMap;
			countMap = MonitorUtils.serviceCountMap;
		} else if (type.equals("dao")) {
			timeMap = MonitorUtils.daoTimeMap;
			countMap = MonitorUtils.daoCountMap;
		}

		for (String key : timeMap.keySet()) {
			Map<String, String>	item = new HashMap<>();
			item.put("method", key);
			item.put("totalCount", String.valueOf(countMap.get(key).longValue()));
			item.put("totalTime", String.valueOf(timeMap.get(key).longValue()));
			item.put("avgTime", String.valueOf(timeMap.get(key).longValue() / countMap.get(key).longValue()));
			item.put("exceptionCount", String.valueOf(MonitorUtils.exceptionCountMap.get(key) == null ? 0 : MonitorUtils.exceptionCountMap.get(key).longValue()));
			items.add(item);
		}

		result.put("total", items.size());
		result.put("rows", items);
        renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, result);
	}
}
