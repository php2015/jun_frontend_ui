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
import com.chensi.common.Pager;
import com.chensi.common.TreeNode;
import com.chensi.model.Role;
import com.chensi.model.User;
import com.chensi.service.IMenuService;
import com.chensi.service.IRoleService;
import com.chensi.service.IUserService;
import com.chensi.util.BeanUtils;
import com.chensi.util.TreeUtil;

/**
 * 角色
 * @author chensi
 * @version 2016-8-6 下午10:04:03
 */
@Controller
@RequestMapping("role")
public class RoleController {

	@Autowired
	private IRoleService roleService;

	@Autowired
	private IUserService userService;

	@Autowired
	private IMenuService menuService;

	/**
	 * 角色页面
	 * @return
	 */
	@RequiresPermissions("index:user:role")
	@RequestMapping("main")
	public String main() {
		return "role/main";
	}

	/**
	 * 授权页面
	 * @return
	 */
	@RequiresPermissions("role:grant")
	@RequestMapping("viewGrant")
	public ModelAndView viewGrant(Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		return new ModelAndView("role/grant", map);
	}

	/**
	 * 加载角色的权限
	 * @param id
	 * @return
	 */
	@RequestMapping({ "listMyTree.do" })
	@ResponseBody
	public AjaxJson listMyTree(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		List<TreeNode> myList = TreeUtil.listTreeNodes(roleService.listMyMenu(id, null));
		List<TreeNode> list = TreeUtil.listTreeNodes(menuService.list());
		for (TreeNode x : myList) {
			for (TreeNode y : list) {
				if (x.getId() == y.getId()) {
					y.setChecked(true);
				}
			}
		}
		return AjaxJson.getSuccessInfo(list);
	}

	/** 角色list */
	@RequestMapping({ "list.do", "list.json" })
	@ResponseBody
	public AjaxJson list() {
		return AjaxJson.getSuccessInfo(roleService.list());
	}

	/**
	 * 筛选加载列表
	 * @return
	 */
	@RequiresPermissions("index:user:role")
	@RequestMapping({ "page.do", "page.json" })
	@ResponseBody
	public AjaxJson page(Role role, Pager pager) {
		return AjaxJson.getSuccessInfo(roleService.pageByEntity(role, pager));
	}

	/**
	 * 添加页面
	 * @return
	 */
	@RequiresPermissions("role:add")
	@RequestMapping("add")
	public ModelAndView add() {
		return new ModelAndView("role/edit");
	}

	/**
	 * 修改页面
	 * @return
	 */
	@RequiresPermissions("role:update")
	@RequestMapping("update")
	public ModelAndView update(Role role) {
		Role entity = roleService.get(role.getId());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("role", entity);
		return new ModelAndView("role/edit", map);
	}

	/**
	 * 保存
	 * @return
	 */
	@RequiresPermissions(value = { "role:update", "role:add" }, logical = Logical.OR)
	@RequestMapping("save.do")
	@ResponseBody
	public AjaxJson save(Role role) {
		if (role.getId() == null) {
			if (!StringUtils.isNoneBlank(role.getName())) {
				return AjaxJson.getFailInfo(Constants.NOT_BLANK);
			}
			Role param = new Role();
			param.setName(role.getName());
			Role tmp = roleService.getByEntity(param);
			if (tmp != null) {
				return AjaxJson.getFailInfo(Constants.ROLE_EXIST);
			}
			if (role.getSort() == null) {
				role.setSort(roleService.getMaxSort());
			}
			roleService.save(role);
		} else {
			Role param = new Role();
			param.setName(role.getName());
			param.setIdNe(role.getId());
			Role tmp = roleService.getByEntity(param);
			if (tmp != null) {
				return AjaxJson.getFailInfo(Constants.USER_EXIST);
			}
			Role old = roleService.get(role.getId());
			BeanUtils.copyNotNullProperties(role, old);
			roleService.update(old);
		}
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequiresPermissions("role:remove")
	@RequestMapping("remove.do")
	@ResponseBody
	public AjaxJson remove(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		// 校验允许删除
		User param = new User();
		param.setRoleId(id);
		User tmp = userService.getByEntity(param);
		if (tmp != null) {
			return AjaxJson.getFailInfo(Constants.NOT_DELETE);
		}
		roleService.remove(id);
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 授权
	 * @param id
	 * @param menuIds
	 * @return
	 */
	@RequiresPermissions("role:grant")
	@RequestMapping("grant.do")
	@ResponseBody
	public AjaxJson grant(@RequestParam("id") Integer id, @RequestParam("menuIds") List<Integer> menuIds) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		roleService.savePermission(id, menuIds);
		return AjaxJson.getSuccessInfo();
	}

}
