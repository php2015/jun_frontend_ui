package org.zyl.ms.modules.user.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.zyl.ms.conf.properties.SystemProperties;
import org.zyl.ms.general.GeneralSystemConstant;
import org.zyl.ms.general.session.SessionUser;
import org.zyl.ms.modules.user.entity.UserInfo;
import org.zyl.ms.modules.user.mapper.UserInfoMapper;
import org.zyl.ms.modules.user.param.request.UserInfoCreateParameter;
import org.zyl.ms.modules.user.param.request.UserInfoQueryParameter;
import org.zyl.ms.modules.user.param.request.UserInfoUpdateParameter;
import org.zyl.ms.modules.user.param.response.UserInfoQueryData;
import org.zyl.ms.util.jwt.JwtUtil;
import org.zyl.support.annotation.ValidateConstraints;
import org.zyl.support.e.Order;
import org.zyl.support.e.SqlParameter;
import org.zyl.support.response.ResponseCode;
import org.zyl.support.response.t.BaseDetailResponse;
import org.zyl.support.response.t.BaseListResponse;
import org.zyl.util.map.MapControl;
import org.zyl.util.time.DateTimeUtils;
import org.zyl.util.validate.ValidateUtil;

import net.sf.json.JSONObject;

/**
 * 用户信息
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-11 16:15:55
 */
@RestController
@RequestMapping("/user/info/")
public class UserInfoController {
	@Resource
	private UserInfoMapper userInfoMapper;
	@Autowired
	private SystemProperties systemProperties;
	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	/**
	 * 添加
	 */
	@RequestMapping(value = "/create.html", method = RequestMethod.POST)
	public String create(@RequestBody UserInfoCreateParameter p) {
		if (!ValidateConstraints.validate(p)) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap()).toString();
		}

		UserInfo qf = new UserInfo();
		BeanUtils.copyProperties(p, qf);
		userInfoMapper.create(qf);

		if (qf.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}

		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/delete.html", method = RequestMethod.POST)
	public String delete(@RequestBody UserInfoQueryParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		int result = userInfoMapper.delete(SqlParameter.getParameter().addQuery("id", p.getId()).getMap());

		if (result <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.ERROR).getMap()).toString();
		}
		return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.SUCCESS).getMap()).toString();
	}

	/**
	 * 修改
	 */
	@RequestMapping(value = "/update.html", method = RequestMethod.POST)
	public String update(@RequestBody UserInfoUpdateParameter p) {
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		int result = userInfoMapper.update(SqlParameter.getParameter()
				.addQuery("id", p.getId())
				.addUpdate("userName", p.getUserName())
				.addUpdate("userHead", p.getUserHead())
				.addUpdate("userSex", p.getUserSex())
				.addUpdate("userUnionId", p.getUserUnionId())
				.addUpdate("userNickName", p.getUserNickName())
				.addUpdate("userPhone", p.getUserPhone())
				.addUpdate("userPhoneType", p.getUserPhoneType())
				.addUpdate("userPass", p.getUserPass())
				.addUpdate("loginLng", p.getLoginLng())
				.addUpdate("loginLat", p.getLoginLat())
				.addUpdate("loginAreaCode", p.getLoginAreaCode())
				.addUpdate("loginAreaName", p.getLoginAreaName())
				.addUpdate("userSignature", p.getUserSignature())
				.addUpdate("birthday", p.getBirthday())
				.addUpdate("userLastTime", p.getUserLastTime())
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
	public String query(@RequestBody UserInfoQueryParameter p) {
		BaseListResponse<UserInfoQueryData> response = new BaseListResponse<UserInfoQueryData>();
		
		SqlParameter parameter = SqlParameter.getParameter()
				.addQuery("userName", p.getUserName())
				.addQuery("userPhone", p.getUserPhone())
				.addLimit(p.getPageNo(), p.getPageSize())
				.addOrder("id", Order.Asc);
		
		List<UserInfo> datas = userInfoMapper.query(parameter.getMap());
		for (UserInfo d : datas) {
			UserInfoQueryData data = new UserInfoQueryData();
			BeanUtils.copyProperties(d, data);
			data.setCreateTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, d.getCreateTime()));
			data.setUserLastTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, d.getUserLastTime()));
			data.setUpdateTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, d.getUpdateTime()));
			
			response.getDatas().add(data);
		}
		response.init_pagger(userInfoMapper.count(parameter.getMap()),p.getPageNo(), p.getPageSize());
		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 详情
	 */
	@RequestMapping(value = "/detail.html", method = RequestMethod.POST)
	public String detail(@RequestBody UserInfoQueryParameter p) {
		BaseDetailResponse<UserInfoQueryData> response = new BaseDetailResponse<UserInfoQueryData>();
		if (p.getId() <= 0) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		UserInfo data = userInfoMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("id", p.getId())
						.getMap());

		UserInfoQueryData d = new UserInfoQueryData();
		BeanUtils.copyProperties(data, d);
		response.setData(d);

		response.init_code(ResponseCode.SUCCESS);
		return JSONObject.fromObject(response).toString();
	}
	/**
	 * 登录
	 */
	@RequestMapping(value = "/login.html", method = RequestMethod.POST)
	public String login(@RequestBody UserInfoQueryParameter p) {
		BaseDetailResponse<UserInfoQueryData> response = new BaseDetailResponse<UserInfoQueryData>();
		if (!ValidateUtil.isNotBlank(p.getUserName())
				||!ValidateUtil.isNotBlank(p.getUserPass())) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}

		UserInfo data = userInfoMapper.detail(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addQuery("userName", p.getUserName())
						.addQuery("userPass", p.getUserPass())
						.getMap());
		
		if (data==null) {
			response.init_code(ResponseCode.ERROR);
			return JSONObject.fromObject(response).toString();
		}

		UserInfoQueryData d = new UserInfoQueryData();
		BeanUtils.copyProperties(data, d);
		d.setCreateTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, data.getCreateTime()));
		d.setUpdateTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, data.getUpdateTime()));
		d.setUserLastTime(DateTimeUtils.formatDateToString(DateTimeUtils.pattern_yyyy_MM_dd_HH_mm_ss, data.getUserLastTime()));
		response.setData(d);
		
		// 缓存用户信息到redis
		stringRedisTemplate.opsForValue().set(String.format(GeneralSystemConstant.KEY_USER_INFO, data.getId()), JSONObject.fromObject(d).toString());
		
		SessionUser user = new SessionUser();
		BeanUtils.copyProperties(d, user);
		// 生成token
		String token = JwtUtil.createJWT(JwtUtil.TTL_ONE_YEAR, systemProperties.getJwtKey(),user);
		
		return JSONObject.fromObject(MapControl.getControl()
				.init_code(ResponseCode.SUCCESS)
				.put("data", d)
				.put("token", token)
				.getMap()).toString();
	}
	/**
	 * 修改密码
	 */
	@RequestMapping(value = "/change_password.html", method = RequestMethod.POST)
	public String change_password(@RequestBody UserInfoQueryParameter p) {
		System.err.println("修改密码参数:"+JSONObject.fromObject(p).toString());
		BaseDetailResponse<UserInfoQueryData> response = new BaseDetailResponse<UserInfoQueryData>();
		if (!ValidateUtil.isNotBlank(p.getUserPass())
				||!ValidateUtil.isNotBlank(p.getOldPassword())
				||!ValidateUtil.isNotBlank(p.getToken())) {
			return JSONObject.fromObject(MapControl.getControl().init_code(ResponseCode.REQUEST_NOT).getMap())
					.toString();
		}
		
		long userId = JwtUtil.getUserId(p.getToken(), systemProperties.getJwtKey());

		int result = userInfoMapper.update(SqlParameter.getParameter()
						.addLimit(p.getPageNo(), p.getPageSize())
						.addUpdate("userPass", p.getUserPass())
						.addQuery("id", userId)
						.getMap());
		
		if (result<=0) {
			response.init_code(ResponseCode.ERROR);
			return JSONObject.fromObject(response).toString();
		}
		
		// 清除cookie
		// 跳转到登录页
		
		return JSONObject.fromObject(MapControl.getControl()
				.init_code(ResponseCode.SUCCESS)
				.getMap()).toString();
	}
}