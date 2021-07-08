package com.chensi.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * 角色表：t_role
 * @author chensi
 * @version 2016-8-5 下午10:28:13
 */
@SuppressWarnings("serial")
public class Role implements Serializable{
	/**id*/
	private Integer id;
	/**角色名*/
	private String name;
	/**排序码*/
	private Integer sort;
	/**备注*/
	private String remark;
	
	//--dto
	@JsonIgnore
	private Integer idNe;//id不等于
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public Integer getIdNe() {
		return idNe;
	}
	public void setIdNe(Integer idNe) {
		this.idNe = idNe;
	}
	
}
