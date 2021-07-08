package org.mintleaf.modules.generator.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author MengchuZhang
 * @email 6153629@qq.com
 * @date 2020-10-29 23:03:30
 */
@TableName("core_user")
public class CoreUserEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 用户表主键
	 */
	@TableId
	private Integer id;
	/**
	 * 租户id，0为系统用户
	 */
	private Integer tenantid;
	/**
	 * 用户名
	 */
	private String name;
	/**
	 * 用户密码MD5加密
	 */
	private String psw;
	/**
	 * 用户邮箱
	 */
	private String email;
	/**
	 * 创建人，0为初始化
	 */
	private Integer creator;
	/**
	 * 创建时间
	 */
	private Date createtime;
	/**
	 * 用户状态，1启用，0禁用
	 */
	private Integer flag;
	/**
	 * 最后登录时间
	 */
	private Date logintime;
	/**
	 * 更新者id
	 */
	private Integer updateuser;
	/**
	 * 更新时间
	 */
	private Date updatetime;

	/**
	 * 设置：用户表主键
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：用户表主键
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：租户id，0为系统用户
	 */
	public void setTenantid(Integer tenantid) {
		this.tenantid = tenantid;
	}
	/**
	 * 获取：租户id，0为系统用户
	 */
	public Integer getTenantid() {
		return tenantid;
	}
	/**
	 * 设置：用户名
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * 获取：用户名
	 */
	public String getName() {
		return name;
	}
	/**
	 * 设置：用户密码MD5加密
	 */
	public void setPsw(String psw) {
		this.psw = psw;
	}
	/**
	 * 获取：用户密码MD5加密
	 */
	public String getPsw() {
		return psw;
	}
	/**
	 * 设置：用户邮箱
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * 获取：用户邮箱
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * 设置：创建人，0为初始化
	 */
	public void setCreator(Integer creator) {
		this.creator = creator;
	}
	/**
	 * 获取：创建人，0为初始化
	 */
	public Integer getCreator() {
		return creator;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreatetime() {
		return createtime;
	}
	/**
	 * 设置：用户状态，1启用，0禁用
	 */
	public void setFlag(Integer flag) {
		this.flag = flag;
	}
	/**
	 * 获取：用户状态，1启用，0禁用
	 */
	public Integer getFlag() {
		return flag;
	}
	/**
	 * 设置：最后登录时间
	 */
	public void setLogintime(Date logintime) {
		this.logintime = logintime;
	}
	/**
	 * 获取：最后登录时间
	 */
	public Date getLogintime() {
		return logintime;
	}
	/**
	 * 设置：更新者id
	 */
	public void setUpdateuser(Integer updateuser) {
		this.updateuser = updateuser;
	}
	/**
	 * 获取：更新者id
	 */
	public Integer getUpdateuser() {
		return updateuser;
	}
	/**
	 * 设置：更新时间
	 */
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}
	/**
	 * 获取：更新时间
	 */
	public Date getUpdatetime() {
		return updatetime;
	}
}
