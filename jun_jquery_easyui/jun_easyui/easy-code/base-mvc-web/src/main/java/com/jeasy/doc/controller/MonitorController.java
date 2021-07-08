package com.jeasy.doc.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeasy.base.controller.ControllerSupport;
import com.jeasy.base.controller.ModelResult;
import com.jeasy.doc.util.MonitorUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/monitor")
public class MonitorController extends ControllerSupport {

	@RequestMapping(value = "")
	public String index() {
		return "monitor";
	}

	@RequestMapping(value = "report")
	@ResponseBody
	public void report(@RequestParam("type") String type) {
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
		responseEntity(ModelResult.CODE_200, ModelResult.SUCCESS, result);
	}
}
