package com.chensi.util;

import java.util.ArrayList;
import java.util.List;

import com.chensi.common.Constants;
import com.chensi.common.TreeNode;
import com.chensi.model.Menu;

/**
 * tree工具类
 * @author chensi
 * @version 2016-8-10 下午9:03:28
 */
public class TreeUtil {

	/**
	 * 生成ztree的节点
	 * @param list
	 * @return
	 */
	public static List<TreeNode> listTreeNodes(List<Menu> list) {
		List<TreeNode> nodes = new ArrayList<TreeNode>();
		for (Menu m : list) {
			TreeNode node = new TreeNode();
			node.setId(m.getId());
			node.setName(m.getName());
			node.setpId(m.getParentId());
			node.setIcon(Constants.ICON_PATH + m.getIcon());
			nodes.add(node);
		}
		return nodes;
	}

	/**
	 * 无限递归生成菜单
	 * @param list
	 * @return
	 */
	public static String buildMenu(List<Menu> menus) {
		StringBuilder html = new StringBuilder();
		for (Menu menu : menus) {
			if (menu.getParentId() != null && menu.getParentId() == Constants.MENU_ROOT_ID) {
				build(html, menu, menus);
			}
		}
		return html.toString();
	}

	private static void build(StringBuilder html, Menu menu, List<Menu> menus) {
		List<Menu> children = new ArrayList<Menu>();
		Integer id = menu.getId();
		for (Menu child : menus) {
			if (id.equals(child.getParentId())) {
				children.add(child);
			}
		}
		if (!children.isEmpty()) {
			html.append("<dl id='menu-article'><dt><img src='" + Constants.ICON_PATH + menu.getIcon() + "'> " + menu.getName()
					+ "<i class='Hui-iconfont menu_dropdown-arrow'>&#xe6d5;</i></dt><dd><ul><li>");
			for (Menu child : children) {
				build(html, child, menus);
			}
			html.append("</li></ul></dd></dl>");
		} else if (menu.getParentId() == Constants.MENU_ROOT_ID) {
			// 当没有下级且自己又是root的子集情况
			html.append("<dl id='menu-article'><dt><img src='" + Constants.ICON_PATH + menu.getIcon() + "'> " + menu.getName()
					+ "</dt><dd><ul></ul></dd></dl>");
		} else {
			// 最下级
			html.append("<li><a data-href='" + menu.getUrl() + "'  data-title='" + menu.getName() + "' href='javascript:void(0)'><img src='"
					+ Constants.ICON_PATH + menu.getIcon() + "'> " + menu.getName() + "</a></li>");
		}
	}

}
