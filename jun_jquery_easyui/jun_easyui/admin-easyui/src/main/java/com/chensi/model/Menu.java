package com.chensi.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * 菜单：t_menu
 * @author chensi
 * @version 2016-8-5 下午10:49:59
 */
@SuppressWarnings("serial")
public class Menu implements Serializable{
	/**id*/
	private Integer id;
	/**父id*/
	private Integer parentId;
	/**url类型： @see Constants#MENUTYPE_IS_MENU @see Constants#MENUTYPE_IS_BUTTON @see Constants#MENUTYPE_IS_API*/
	private Integer type;
	/**菜单名 */
	private String name;
	/**code*/
	private String code;
	/**排序码*/
	private Integer sort;
	/**url*/
	private String url;
	/**图标*/
	private String icon;
	
	//--dto
	@JsonIgnore
	private Integer idNe;//id不等于
	
	//--vo
	/**父节点名字*/
	private String parentName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getIdNe() {
		return idNe;
	}

	public void setIdNe(Integer idNe) {
		this.idNe = idNe;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
}
