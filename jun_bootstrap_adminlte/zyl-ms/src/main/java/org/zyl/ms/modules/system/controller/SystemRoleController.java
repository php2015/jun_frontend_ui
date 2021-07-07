package org.zyl.ms.modules.system.controller;

import org.zyl.ms.modules.system.entity.SystemRole;
import org.zyl.ms.modules.system.mapper.SystemRoleMapper;
import org.zyl.ms.modules.system.param.request.SystemRoleCreateParameter;
import org.zyl.ms.modules.system.param.request.SystemRoleQueryParameter;
import org.zyl.ms.modules.system.param.request.SystemRoleUpdateParameter;
import org.zyl.ms.modules.system.param.response.SystemRoleQueryData;
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
 * 角色
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/system/role/")
public class SystemRoleController {
	@Resource
	private SystemRoleMapper systemRoleMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody SystemRoleCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		SystemRole qf = new SystemRole();
		BeanUtils.copyProperties(p, qf);
		systemRoleMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody SystemRoleQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = systemRoleMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody SystemRoleUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = systemRoleMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("roleName", p.getRoleName())
				.addUpdate("roleDesc", p.getRoleDesc())
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
	public String query(@RequestBody SystemRoleQueryParameter p) {
		BaseListResponse<SystemRoleQueryData> response = new BaseListResponse<SystemRoleQueryData>();
		
		SqlParameter parameter = SqlParameter.getParameter().addLimit(p.getPageNo(), p.getPageSize());
		
		List<SystemRole> datas = systemRoleMapper.query(parameter.getMap());
		for (SystemRole d : datas) {
			SystemRoleQueryData data = new SystemRoleQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(systemRoleMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody SystemRoleQueryParameter p) {
		BaseDetailResponse<SystemRoleQueryData> response = new BaseDetailResponse<SystemRoleQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		SystemRole data = systemRoleMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		SystemRoleQueryData d = new SystemRoleQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}