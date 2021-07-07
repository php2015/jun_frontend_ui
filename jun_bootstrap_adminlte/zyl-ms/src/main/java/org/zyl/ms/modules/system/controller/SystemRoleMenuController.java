package org.zyl.ms.modules.system.controller;

import org.zyl.ms.modules.system.entity.SystemRoleMenu;
import org.zyl.ms.modules.system.mapper.SystemRoleMenuMapper;
import org.zyl.ms.modules.system.param.request.SystemRoleMenuCreateParameter;
import org.zyl.ms.modules.system.param.request.SystemRoleMenuQueryParameter;
import org.zyl.ms.modules.system.param.request.SystemRoleMenuUpdateParameter;
import org.zyl.ms.modules.system.param.response.SystemRoleMenuQueryData;
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
 * 角色与菜单关联
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/system/role_menu/")
public class SystemRoleMenuController {
	@Resource
	private SystemRoleMenuMapper systemRoleMenuMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody SystemRoleMenuCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		SystemRoleMenu qf = new SystemRoleMenu();
		BeanUtils.copyProperties(p, qf);
		systemRoleMenuMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody SystemRoleMenuQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = systemRoleMenuMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody SystemRoleMenuUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = systemRoleMenuMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("roleId", p.getRoleId())
				.addUpdate("menuId", p.getMenuId())
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
	public String query(@RequestBody SystemRoleMenuQueryParameter p) {
		BaseListResponse<SystemRoleMenuQueryData> response = new BaseListResponse<SystemRoleMenuQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		SqlParameter parameter = SqlParameter.getParameter().addQuery("id", p.getId()).addLimit(p.getPageNo(), p.getPageSize());
		
		List<SystemRoleMenu> datas = systemRoleMenuMapper.query(parameter.getMap());
		for (SystemRoleMenu d : datas) {
			SystemRoleMenuQueryData data = new SystemRoleMenuQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(systemRoleMenuMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody SystemRoleMenuQueryParameter p) {
		BaseDetailResponse<SystemRoleMenuQueryData> response = new BaseDetailResponse<SystemRoleMenuQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		SystemRoleMenu data = systemRoleMenuMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		SystemRoleMenuQueryData d = new SystemRoleMenuQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}