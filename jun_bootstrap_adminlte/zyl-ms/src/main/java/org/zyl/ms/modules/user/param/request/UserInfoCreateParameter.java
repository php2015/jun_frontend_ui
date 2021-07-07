package org.zyl.ms.modules.user.param.request;

import org.zyl.support.annotation.constraints.Constraints;
import org.zyl.support.annotation.constraints.ConstraintsString;

/**
 * 用户信息 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserInfoCreateParameter {
	/**
	 * 用户名
	 */
	@ConstraintsString(maxSize = 50, con = @Constraints(allowNull = true))
	private String userName;
	/**
	 * 用户头像
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String userHead;
	/**
	 * 用户性别
	 */
	@ConstraintsString(maxSize = 10, con = @Constraints(allowNull = true))
	private String userSex;
	/**
	 * 用户openID
	 */
	@ConstraintsString(maxSize = 255, con = @Constraints(allowNull = true))
	private String userUnionId;
	/**
	 * 昵称
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String userNickName;
	/**
	 * 手机号
	 */
	@ConstraintsString(maxSize = 16, con = @Constraints(allowNull = true))
	private String userPhone;
	/**
	 * 手机型号
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String userPhoneType;
	/**
	 * 用户密码
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String userPass;
	/**
	 * 经度
	 */
	@ConstraintsString(maxSize = 16, con = @Constraints(allowNull = true))
	private String loginLng;
	/**
	 * 纬度
	 */
	@ConstraintsString(maxSize = 16, con = @Constraints(allowNull = true))
	private String loginLat;
	/**
	 * 区域代码
	 */
	@ConstraintsString(maxSize = 32, con = @Constraints(allowNull = true))
	private String loginAreaCode;
	/**
	 * 区域名
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String loginAreaName;
	/**
	 * 手机APP 签名
	 */
	@ConstraintsString(maxSize = 256, con = @Constraints(allowNull = true))
	private String userSignature;
	/**
	 * 生日
	 */
	@ConstraintsString(maxSize = 32, con = @Constraints(allowNull = true))
	private String birthday;
	/**
	 * 最后登录时间
	 */
	@ConstraintsString(maxSize = 0, con = @Constraints(allowNull = true))
	private String userLastTime;
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

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserHead() {
		return userHead;
	}
	public void setUserHead(String userHead) {
		this.userHead = userHead;
	}
	public String getUserSex() {
		return userSex;
	}
	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}
	public String getUserUnionId() {
		return userUnionId;
	}
	public void setUserUnionId(String userUnionId) {
		this.userUnionId = userUnionId;
	}
	public String getUserNickName() {
		return userNickName;
	}
	public void setUserNickName(String userNickName) {
		this.userNickName = userNickName;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getUserPhoneType() {
		return userPhoneType;
	}
	public void setUserPhoneType(String userPhoneType) {
		this.userPhoneType = userPhoneType;
	}
	public String getUserPass() {
		return userPass;
	}
	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}
	public String getLoginLng() {
		return loginLng;
	}
	public void setLoginLng(String loginLng) {
		this.loginLng = loginLng;
	}
	public String getLoginLat() {
		return loginLat;
	}
	public void setLoginLat(String loginLat) {
		this.loginLat = loginLat;
	}
	public String getLoginAreaCode() {
		return loginAreaCode;
	}
	public void setLoginAreaCode(String loginAreaCode) {
		this.loginAreaCode = loginAreaCode;
	}
	public String getLoginAreaName() {
		return loginAreaName;
	}
	public void setLoginAreaName(String loginAreaName) {
		this.loginAreaName = loginAreaName;
	}
	public String getUserSignature() {
		return userSignature;
	}
	public void setUserSignature(String userSignature) {
		this.userSignature = userSignature;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getUserLastTime() {
		return userLastTime;
	}
	public void setUserLastTime(String userLastTime) {
		this.userLastTime = userLastTime;
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