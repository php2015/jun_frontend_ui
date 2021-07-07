package org.zyl.ms.modules.system.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.zyl.ms.modules.system.entity.SystemMenu;
import org.zyl.ms.modules.system.mapper.SystemMenuMapper;
import org.zyl.ms.modules.system.param.request.SystemMenuCreateParameter;
import org.zyl.ms.modules.system.param.request.SystemMenuQueryParameter;
import org.zyl.ms.modules.system.param.request.SystemMenuUpdateParameter;
import org.zyl.ms.modules.system.param.response.SystemMenuQueryData;
import org.zyl.support.annotation.ValidateConstraints;
import org.zyl.support.e.Order;
import org.zyl.support.e.SqlParameter;
import org.zyl.support.response.ResponseCode;
import org.zyl.support.response.t.BaseDetailResponse;
import org.zyl.support.response.t.BaseListResponse;
import org.zyl.util.map.MapControl;

import net.sf.json.JSONObject;

/**
 * 功能菜单
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/system/menu/")
public class SystemMenuController {
	@Resource
	private SystemMenuMapper systemMenuMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody SystemMenuCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		SystemMenu qf = new SystemMenu();
		BeanUtils.copyProperties(p, qf);
		systemMenuMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody SystemMenuQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = systemMenuMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody SystemMenuUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = systemMenuMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("menuName", p.getMenuName())
				.addUpdate("menuIcon", p.getMenuIcon())
				.addUpdate("menuLink", p.getMenuLink())
				.addUpdate("menuSort", p.getMenuSort())
				.addUpdate("menuParentId", p.getMenuParentId())
				.addUpdate("menuIsLink", p.getMenuIsLink())
				.addUpdate("createTime", p.getCreateTime())
				.addUpdate("updateTime", p.getUpdateTime())
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
	public String query(@RequestBody SystemMenuQueryParameter p) {
		BaseListResponse<SystemMenuQueryData> response = new BaseListResponse<SystemMenuQueryData>();
		
		SqlParameter parameter = SqlParameter.getParameter()
				.addLimit(p.getPageNo(), p.getPageSize())
				.addOrder("id", Order.Asc);
		
		List<SystemMenu> datas = systemMenuMapper.query(parameter.getMap());
		for (SystemMenu d : datas) {
			SystemMenuQueryData data = new SystemMenuQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(systemMenuMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 查询菜单集合
	 * @author yzzhouyalei@foxmail.com
	 * @time 2019-05-13 16:03:49
	 */
	@RequestMapping(value = "/query_by_json.html", method = RequestMethod.POST)
	public String query_by_json(@RequestBody SystemMenuQueryParameter p) {
		BaseListResponse<SystemMenuQueryData> response = new BaseListResponse<SystemMenuQueryData>();
		SqlParameter parameter = SqlParameter.getParameter().addLimit(p.getPageNo(), p.getPageSize());
		List<SystemMenu> datas = systemMenuMapper.query(parameter.getMap());
		
		// 父级
		for (SystemMenu s : datas) {
			if (s.getMenuParentId()==0) {
				SystemMenuQueryData data = new SystemMenuQueryData();
				BeanUtils.copyProperties(s, data);
				
				response.getDatas().add(data);
			}
		}
		
		// 子级
		for (SystemMenuQueryData d : response.getDatas()) {
			for(SystemMenu s : datas) {
				if (new Long(d.getId()).intValue()==s.getMenuParentId()) {
					SystemMenuQueryData data = new SystemMenuQueryData();
					BeanUtils.copyProperties(s, data);
					d.getChildrens().add(data);
				}
			}
		}
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody SystemMenuQueryParameter p) {
		BaseDetailResponse<SystemMenuQueryData> response = new BaseDetailResponse<SystemMenuQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		SystemMenu data = systemMenuMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		SystemMenuQueryData d = new SystemMenuQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}