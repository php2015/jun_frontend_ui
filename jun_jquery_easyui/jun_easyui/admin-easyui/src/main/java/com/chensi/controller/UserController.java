package com.chensi.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.chensi.common.AjaxJson;
import com.chensi.common.Constants;
import com.chensi.common.LoginUser;
import com.chensi.common.Pager;
import com.chensi.model.User;
import com.chensi.service.IUserService;
import com.chensi.util.BeanUtils;
import com.chensi.util.CommonUtil;
import com.chensi.util.DateUtils;
import com.chensi.util.MD5Util;
import com.chensi.util.WebUtil;

@Controller
@RequestMapping("user")
public class UserController {

	@Autowired
	private IUserService userService;

	// ===============view=============

	/**
	 * 列表页面
	 */
	@RequiresPermissions("user:index")
	@RequestMapping("index")
	public String index() {
		return "user/index";
	}

	/**
	 * 详情页面
	 */
	@RequiresPermissions("user:detail")
	@RequestMapping("detail")
	public ModelAndView detail(Integer id) {
		User entity = userService.get(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user", entity);
		return new ModelAndView("user/detail", map);
	}

	/**
	 * 添加页面
	 */
	@RequiresPermissions("user:add")
	@RequestMapping("addView")
	public ModelAndView addView() {
		return new ModelAndView("user/addView");
	}

	/**
	 * 修改页面
	 */
	@RequiresPermissions("user:update")
	@RequestMapping("updateView")
	public ModelAndView updateView(User user) {
		User entity = userService.get(user.getId());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user", entity);
		return new ModelAndView("user/updateView", map);
	}

	/**
	 * 测试弹框嵌套(无业务意义)
	 */
	@RequiresPermissions("user:add")
	@RequestMapping("demoEdit")
	public ModelAndView demoEdit() {
		return new ModelAndView("user/demoEdit");
	}

	// =====================ajax======================

	/**
	 * 获取详情
	 * 
	 * @param id
	 * @return
	 */
	@RequiresPermissions("user:detail")
	@RequestMapping({ "get.do", "get.json" })
	@ResponseBody
	public AjaxJson get(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		return AjaxJson.getSuccessInfo(userService.get(id));
	}

	/**
	 * 筛选加载列表
	 * 
	 * @return
	 */
	@RequiresPermissions("user:index")
	@RequestMapping({ "page.do" })
	@ResponseBody
	public AjaxJson page(User model, Pager pager) {
		return AjaxJson.getSuccessInfo(userService.pageGridByEntity(model, pager));
	}

	/**
	 * 添加
	 * 
	 * @return
	 */
	@RequiresPermissions("user:add")
	@RequestMapping("add.do")
	@ResponseBody
	public AjaxJson add(User model) {
		if (!StringUtils.isNoneBlank(model.getUsername(), model.getTel())) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		User param = new User();
		param.setUsername(model.getUsername());
		User tmp = userService.getByEntity(param);
		if (tmp != null) {
			return AjaxJson.getFailInfo(Constants.USER_EXIST);
		}
		if (StringUtils.isBlank(model.getAvatar())) {
			// 默认头像
			model.setAvatar(Constants.AVATAR_PATH);
		}
		model.setPassword(MD5Util.GetMD5Code(Constants.DEFAULT_PASSWORD));
		model.setStatus(Constants.USER_REVIEW);
		model.setIsSuper(Constants.USER_SUPER_N);
		model.setCreateTime(DateUtils.getNowTime());
		model.setLastTime(DateUtils.getNowTime());
		userService.save(model);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 修改
	 * 
	 * @return
	 */
	@RequiresPermissions("user:update")
	@RequestMapping("update.do")
	@ResponseBody
	public AjaxJson update(User model) {
		User param = new User();
		param.setUsername(model.getUsername());
		param.setIdNe(model.getId());
		User tmp = userService.getByEntity(param);
		if (tmp != null) {
			return AjaxJson.getFailInfo(Constants.USER_EXIST);
		}
		User old = userService.get(model.getId());
		BeanUtils.copyNotNullProperties(model, old);
		// 拷贝可空参数
		old.setOpenid(model.getOpenid());
		old.setProvince(model.getProvince());
		old.setCity(model.getCity());
		old.setArea(model.getArea());
		old.setAddress(model.getAddress());
		old.setIdcard(model.getIdcard());
		old.setSign(model.getSign());
		old.setRemark(model.getRemark());
		userService.update(old);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequiresPermissions("user:delete")
	@RequestMapping({ "remove.do" })
	@ResponseBody
	public AjaxJson remove(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		// 校验允许删除
		User tmp = userService.get(id);
		LoginUser cur = (LoginUser) WebUtil.getSession().getAttribute(Constants.LOGIN_USER);
		if (cur.getId() == id) {
			return AjaxJson.getFailInfo(Constants.NOT_DELETE_SELF);
		}
		if (tmp.getIsSuper() == Constants.USER_SUPER_Y) {
			return AjaxJson.getFailInfo(Constants.NOT_DELETE_ADMIN);
		}
		userService.remove(id);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 重置密码
	 * 
	 * @param id
	 * @return
	 */
	@RequiresPermissions("user:resetPwd")
	@RequestMapping({ "resetPwd.do" })
	@ResponseBody
	public AjaxJson resetPwd(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		User tmp = userService.get(id);
		tmp.setPassword(MD5Util.GetMD5Code(Constants.DEFAULT_PASSWORD));
		userService.update(tmp);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 修改状态
	 * 
	 * @param id
	 * @param status
	 * @return
	 */
	@RequiresPermissions(value = { "user:toNormal", "user:toFrozen" }, logical = Logical.OR)
	@RequestMapping({ "changeStatus.do" })
	@ResponseBody
	public AjaxJson changeStatus(Integer id, Integer status) {
		if (id == null || status == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		User user = userService.get(id);
		user.setStatus(status);
		userService.update(user);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 批量删除
	 * 
	 * @param ids
	 * @return
	 */
	@RequiresPermissions("user:removeAll")
	@RequestMapping({ "removeAll.do" })
	@ResponseBody
	public AjaxJson removeAll(@RequestParam("ids") List<Integer> ids) {
		if (CommonUtil.isEmptyList(ids)) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		// 校验允许删除
		LoginUser cur = (LoginUser) WebUtil.getSession().getAttribute(Constants.LOGIN_USER);
		for (Integer id : ids) {
			if (cur.getId() == id) {
				return AjaxJson.getFailInfo(Constants.NOT_DELETE_SELF);
			}
			User tmp = userService.get(id);
			if (tmp.getIsSuper() == Constants.USER_SUPER_Y) {
				return AjaxJson.getFailInfo(Constants.NOT_DELETE_ADMIN);
			}
		}
		userService.removeAll(ids);
		return AjaxJson.getSuccessInfo();
	}

}
