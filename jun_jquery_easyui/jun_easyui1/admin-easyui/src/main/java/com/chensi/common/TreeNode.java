package com.chensi.common;
/**
 * ztree的treeNode节点对象
 * @author chensi
 * @version 2016-6-14 下午5:30:36
 */
public class TreeNode {
	/**id*/
	private Integer id;
	/**父id*/
	private Integer pId;
	/**菜单名字*/
	private String name;
	/**icon*/
	private String icon;
	/**是否打开*/
	private Boolean open=false;
	/**是否选中*/
	private Boolean checked=false;
	/**是否有子节点*/
	private Boolean isParent=false;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getpId() {
		return pId;
	}

	public void setpId(Integer pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

	public Boolean getIsParent() {
		return isParent;
	}

	public void setIsParent(Boolean isParent) {
		this.isParent = isParent;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}
	
}
