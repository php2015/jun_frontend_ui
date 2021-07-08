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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.chensi.common.AjaxJson;
import com.chensi.common.Constants;
import com.chensi.common.Pager;
import com.chensi.model.Menu;
import com.chensi.service.IMenuService;
import com.chensi.util.BeanUtils;
import com.chensi.util.TreeUtil;

/**
 * 菜单
 * @author chensi
 * @version 2016-8-7 下午8:18:50
 */
@Controller
@RequestMapping("menu")
public class MenuController {

	@Autowired
	private IMenuService menuService;

	/**
	 * 页面
	 * @return
	 */
	@RequiresPermissions("index:user:menu")
	@RequestMapping("main")
	public String main() {
		return "menu/main";
	}

	/**
	 * 图标页面
	 * @return
	 */
	@RequestMapping("icon")
	public String icon() {
		return "menu/icon";
	}

	/**
	 * 树形菜单
	 * @return
	 */
	@RequestMapping({ "list.do" })
	@ResponseBody
	public AjaxJson list(Integer type) {
		Menu param = new Menu();
		param.setType(type);
		List<Menu> list = menuService.listByEntity(param);
		return AjaxJson.getSuccessInfo(TreeUtil.listTreeNodes(list));
	}

	/**
	 * 筛选加载列表
	 * @return
	 */
	@RequiresPermissions("index:user:user")
	@RequestMapping({ "page.do", "page.json" })
	@ResponseBody
	public AjaxJson page(Menu menu, Pager pager) {
		return AjaxJson.getSuccessInfo(menuService.pageByEntity(menu, pager));
	}

	/**
	 * 添加页面
	 * @return
	 */
	@RequiresPermissions("menu:add")
	@RequestMapping("add")
	public ModelAndView add(Menu menu) {
		return new ModelAndView("menu/edit");
	}

	/**
	 * 修改页面
	 * @return
	 */
	@RequiresPermissions("menu:update")
	@RequestMapping("update")
	public ModelAndView update(Menu menu) {
		Menu entity = menuService.get(menu.getId());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("menu", entity);
		return new ModelAndView("menu/edit", map);
	}

	/**
	 * 保存
	 * @return
	 */
	@RequiresPermissions(value = { "menu:update", "menu:add" }, logical = Logical.OR)
	@RequestMapping("save.do")
	@ResponseBody
	public AjaxJson save(Menu menu) {
		if (menu.getId() == null) {
			if (!StringUtils.isNoneBlank(menu.getName(), menu.getCode())) {
				return AjaxJson.getFailInfo(Constants.NOT_BLANK);
			}
			Menu param = new Menu();
			param.setCode(menu.getCode());
			Menu tmp = menuService.getByEntity(param);
			if (tmp != null) {
				return AjaxJson.getFailInfo(Constants.CODE_EXIST);
			}
			if (menu.getSort() == null) {
				menu.setSort(menuService.getMaxSort());
			}
			// 默认icon
			if (StringUtils.isBlank(menu.getIcon())) {
				menu.setIcon(Constants.ICON_DEFAULT);
			}
			menuService.save(menu);
		} else {
			Menu param = new Menu();
			param.setCode(menu.getCode());
			param.setIdNe(menu.getId());
			Menu tmp = menuService.getByEntity(param);
			if (tmp != null) {
				return AjaxJson.getFailInfo(Constants.CODE_EXIST);
			}
			Menu old = menuService.get(menu.getId());
			BeanUtils.copyNotNullProperties(menu, old);
			menuService.update(old);
		}
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequiresPermissions("menu:delete")
	@RequestMapping("remove.do")
	@ResponseBody
	public AjaxJson remove(Integer id) {
		if (id == null) {
			return AjaxJson.getFailInfo(Constants.NOT_BLANK);
		}
		Menu param = new Menu();
		param.setParentId(id);
		if (menuService.getByEntity(param) != null) {
			return AjaxJson.getFailInfo(Constants.NOT_DELETE);
		}
		menuService.remove(id);
		return AjaxJson.getSuccessInfo();
	}

}
