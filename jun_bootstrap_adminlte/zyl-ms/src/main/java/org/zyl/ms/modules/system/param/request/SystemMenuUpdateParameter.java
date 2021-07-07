package org.zyl.ms.modules.system.param.request;

/**
 * 功能菜单 修改参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemMenuUpdateParameter {
	private long id;
	/**
	 * 菜单名
	 */
	private String menuName;
	/**
	 * 图标
	 */
	private String menuIcon;
	/**
	 * 连接
	 */
	private String menuLink;
	/**
	 * 种类
	 */
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
	private String createTime;
	/**
	 * 更新时间
	 */
	private String updateTime;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
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