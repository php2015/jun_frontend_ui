package org.zyl.ms.modules.user.controller;

import org.zyl.ms.modules.user.entity.UserAddress;
import org.zyl.ms.modules.user.mapper.UserAddressMapper;
import org.zyl.ms.modules.user.param.request.UserAddressCreateParameter;
import org.zyl.ms.modules.user.param.request.UserAddressQueryParameter;
import org.zyl.ms.modules.user.param.request.UserAddressUpdateParameter;
import org.zyl.ms.modules.user.param.response.UserAddressQueryData;
import net.sf.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.zyl.support.annotation.ValidateConstraints;
import org.zyl.support.e.Order;
import org.zyl.support.e.SqlParameter;
import org.zyl.support.response.ResponseCode;
import org.zyl.support.response.t.BaseListResponse;
import org.zyl.support.response.t.BaseDetailResponse;
import org.zyl.util.map.MapControl;

import javax.annotation.Resource;
import java.util.List;

/**
 * 用户地址管理
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/user/address/")
public class UserAddressController {
	@Resource
	private UserAddressMapper userAddressMapper;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody UserAddressCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		UserAddress qf = new UserAddress();
		BeanUtils.copyProperties(p, qf);
		userAddressMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody UserAddressQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = userAddressMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody UserAddressUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = userAddressMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("userId", p.getUserId())
				.addUpdate("receiverName", p.getReceiverName())
				.addUpdate("receiverPhone", p.getReceiverPhone())
				.addUpdate("addrProvince", p.getAddrProvince())
				.addUpdate("addrCity", p.getAddrCity())
				.addUpdate("addrArea", p.getAddrArea())
				.addUpdate("addrDetail", p.getAddrDetail())
				.addUpdate("addrCode", p.getAddrCode())
				.addUpdate("addrPostcode", p.getAddrPostcode())
				.addUpdate("tag", p.getTag())
				.addUpdate("isDefault", p.getIsDefault())
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
	public String query(@RequestBody UserAddressQueryParameter p) {
		BaseListResponse<UserAddressQueryData> response = new BaseListResponse<UserAddressQueryData>();
		SqlParameter parameter = SqlParameter.getParameter()
				.addLimit(p.getPageNo(), p.getPageSize())
				.addOrder("id", Order.Asc);
		
		List<UserAddress> datas = userAddressMapper.query(parameter.getMap());
		for (UserAddress d : datas) {
			UserAddressQueryData data = new UserAddressQueryData();
			BeanUtils.copyProperties(d, data);
			response.getDatas().add(data);
		}
		response.init_pagger(userAddressMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody UserAddressQueryParameter p) {
		BaseDetailResponse<UserAddressQueryData> response = new BaseDetailResponse<UserAddressQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		UserAddress data = userAddressMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		UserAddressQueryData d = new UserAddressQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
}