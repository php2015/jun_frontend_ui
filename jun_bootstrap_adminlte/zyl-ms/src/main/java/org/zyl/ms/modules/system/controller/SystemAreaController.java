package org.zyl.ms.modules.system.controller;

import org.zyl.ms.modules.system.entity.SystemArea;
import org.zyl.ms.modules.system.mapper.SystemAreaMapper;
import org.zyl.ms.modules.system.param.request.SystemAreaCreateParameter;
import org.zyl.ms.modules.system.param.request.SystemAreaQueryParameter;
import org.zyl.ms.modules.system.param.request.SystemAreaUpdateParameter;
import org.zyl.ms.modules.system.param.response.SystemAreaQueryData;
import net.sf.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.zyl.support.annotation.ValidateConstraints;
import org.zyl.support.e.SqlParameter;
import org.zyl.support.response.ResponseCode;
import org.zyl.support.response.t.BaseListResponse;
import org.zyl.support.response.t.BaseDetailResponse;
import org.zyl.util.map.MapControl;

import javax.annotation.Resource;
import java.util.List;

/**
 * 系统地区表
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/system/area/")
public class SystemAreaController {
	@Resource
	private SystemAreaMapper systemAreaMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody SystemAreaCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		SystemArea qf = new SystemArea();
		BeanUtils.copyProperties(p, qf);
		systemAreaMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody SystemAreaQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = systemAreaMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody SystemAreaUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = systemAreaMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("areaCode", p.getAreaCode())
				.addUpdate("areaName", p.getAreaName())
				.addUpdate("areaLevel", p.getAreaLevel())
				.addUpdate("cityCode", p.getCityCode())
				.addUpdate("cityCenter", p.getCityCenter())
				.addUpdate("areaParentId", p.getAreaParentId())
				.getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 查询
	 */
	@RequestMapping(value = "/query.html", method = RequestMethod.POST)
	public String query(@RequestBody SystemAreaQueryParameter p) {
		BaseListResponse<SystemAreaQueryData> response = new BaseListResponse<SystemAreaQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		SqlParameter parameter = SqlParameter.getParameter().addQuery("id", p.getId()).addLimit(p.getPageNo(), p.getPageSize());
		
		List<SystemArea> datas = systemAreaMapper.query(parameter.getMap());
		for (SystemArea d : datas) {
			SystemAreaQueryData data = new SystemAreaQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(systemAreaMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody SystemAreaQueryParameter p) {
		BaseDetailResponse<SystemAreaQueryData> response = new BaseDetailResponse<SystemAreaQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		SystemArea data = systemAreaMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		SystemAreaQueryData d = new SystemAreaQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}