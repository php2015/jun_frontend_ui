package org.zyl.ms.modules.user.controller;

import org.zyl.ms.modules.system.entity.SystemMenu;
import org.zyl.ms.modules.system.mapper.SystemMenuMapper;
import org.zyl.ms.modules.system.param.response.SystemMenuQueryData;
import org.zyl.ms.modules.user.entity.UserRole;
import org.zyl.ms.modules.user.mapper.UserRoleMapper;
import org.zyl.ms.modules.user.param.request.UserRoleCreateParameter;
import org.zyl.ms.modules.user.param.request.UserRoleQueryParameter;
import org.zyl.ms.modules.user.param.request.UserRoleUpdateParameter;
import org.zyl.ms.modules.user.param.response.UserRoleQueryData;
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
 * 用户角色关联
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/user/role/")
public class UserRoleController {
	@Resource
	private UserRoleMapper userRoleMapper;
	@Resource
	private SystemMenuMapper systemMenuMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody UserRoleCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		UserRole qf = new UserRole();
		BeanUtils.copyProperties(p, qf);
		userRoleMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody UserRoleQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = userRoleMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody UserRoleUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = userRoleMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("userId", p.getUserId())
				.addUpdate("roleId", p.getRoleId())
				.addUpdate("roleName", p.getRoleName())
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
	public String query(@RequestBody UserRoleQueryParameter p) {
		BaseListResponse<UserRoleQueryData> response = new BaseListResponse<UserRoleQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		SqlParameter parameter = SqlParameter.getParameter().addQuery("id", p.getId()).addLimit(p.getPageNo(), p.getPageSize());
		
		List<UserRole> datas = userRoleMapper.query(parameter.getMap());
		for (UserRole d : datas) {
			UserRoleQueryData data = new UserRoleQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(userRoleMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody UserRoleQueryParameter p) {
		BaseDetailResponse<UserRoleQueryData> response = new BaseDetailResponse<UserRoleQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		UserRole data = userRoleMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		UserRoleQueryData d = new UserRoleQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 加载用户权限菜单
	 */
	@RequestMapping(value = "/query_right.html", method = RequestMethod.POST)
	public String query_right(@RequestBody UserRoleQueryParameter p) {
		BaseDetailResponse<UserRoleQueryData> response = new BaseDetailResponse<UserRoleQueryData>();
		if (p.getUserId()<=0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		UserRole data = userRoleMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getUserId())
						.getMap());
		
		if (data==null) {
			response.init_code(ResponseCode.ERROR);
			return JSONObject.fromObject(response).toString();
		}

		UserRoleQueryData result = new UserRoleQueryData();
		
		List<SystemMenu> datas = systemMenuMapper.query(SqlParameter.getParameter().addQuery("roleId", data.getRoleId()).getMap());
		for (SystemMenu d : datas) {
			SystemMenuQueryData dd = new SystemMenuQueryData();
			BeanUtils.copyProperties(d, dd);
			result.getMenus().add(dd);
		}
		response.setData(result);
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}