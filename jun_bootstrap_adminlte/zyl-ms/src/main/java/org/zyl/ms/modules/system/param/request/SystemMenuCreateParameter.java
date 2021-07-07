package org.zyl.ms.modules.system.param.request;

import org.zyl.support.annotation.constraints.Constraints;
import org.zyl.support.annotation.constraints.ConstraintsString;

/**
 * 功能菜单 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemMenuCreateParameter {
	/**
	 * 菜单名
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String menuName;
	/**
	 * 图标
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String menuIcon;
	/**
	 * 连接
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String menuLink;
	/**
	 * 种类
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String menuSort;
	/**
	 * 上级ID
	 */
	private int menuParentId;
	/**
	 * 
	 */
	private int menuIsLink;
	/**
	 * 创建时间
	 */
	@ConstraintsString(maxSize = 0, con = @Constraints(allowNull = true))
	private String createTime;
	/**
	 * 更新时间
	 */
	@ConstraintsString(maxSize = 0, con = @Constraints(allowNull = true))
	private String updateTime;

	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuIcon() {
		return menuIcon;
	}
	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}
	public String getMenuLink() {
		return menuLink;
	}
	public void setMenuLink(String menuLink) {
		this.menuLink = menuLink;
	}
	public String getMenuSort() {
		return menuSort;
	}
	public void setMenuSort(String menuSort) {
		this.menuSort = menuSort;
	}
	public int getMenuParentId() {
		return menuParentId;
	}
	public void setMenuParentId(int menuParentId) {
		this.menuParentId = menuParentId;
	}
	public int getMenuIsLink() {
		return menuIsLink;
	}
	public void setMenuIsLink(int menuIsLink) {
		this.menuIsLink = menuIsLink;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
}