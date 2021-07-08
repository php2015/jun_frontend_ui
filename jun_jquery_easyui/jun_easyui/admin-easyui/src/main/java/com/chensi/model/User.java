package com.chensi.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * 用户表t_user
 * @author chensi
 * @version 2016-8-5 下午10:06:39
 */
@SuppressWarnings("serial")
public class User implements Serializable{
	/**主键*/
	private Integer id;
	/**用户名*/
	private String username;
	/**密码*/
	private String password;
	/**角色id*/
	private Integer roleId;
	/**姓名*/
	private String name;
	/**电话*/
	private String tel;
	/**电子邮箱*/
	private String email;
	/**openid*/
	private String openid;
	/**省*/
	private String province;
	/**市*/
	private String city;
	/**区*/
	private String area;
	/**地址*/
	private String address;
	/**身份证号*/
	private String idcard;
	/**头像*/
	private String avatar;
	/**签名*/
	private String sign;
	/**附件*/
	private String attach;
	/**备注*/
	private String remark;
	/**状态*/
	private Integer status;
	/**是否是超级管理员*/
	private Integer isSuper;
	/**创建时间*/
	private String createTime;
	/**上次登录时间*/
	private String lastTime;
	
	//--vo
	/**角色名*/
	private String roleName;
	
	//--dto
	@JsonIgnore
	private Integer idNe; //id不等于

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getAttach() {
		return attach;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public Integer getIdNe() {
		return idNe;
	}

	public void setIdNe(Integer idNe) {
		this.idNe = idNe;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getIsSuper() {
		return isSuper;
	}

	public void setIsSuper(Integer isSuper) {
		this.isSuper = isSuper;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

}
