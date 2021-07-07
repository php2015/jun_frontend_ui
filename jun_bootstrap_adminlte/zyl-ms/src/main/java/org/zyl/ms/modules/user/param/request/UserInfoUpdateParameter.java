package org.zyl.ms.modules.user.param.request;

/**
 * 用户信息 修改参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserInfoUpdateParameter {
	private long id;
	/**
	 * 用户名
	 */
	private String userName;
	/**
	 * 用户头像
	 */
	private String userHead;
	/**
	 * 用户性别
	 */
	private String userSex;
	/**
	 * 用户openID
	 */
	private String userUnionId;
	/**
	 * 昵称
	 */
	private String userNickName;
	/**
	 * 手机号
	 */
	private String userPhone;
	/**
	 * 手机型号
	 */
	private String userPhoneType;
	/**
	 * 用户密码
	 */
	private String userPass;
	/**
	 * 经度
	 */
	private String loginLng;
	/**
	 * 纬度
	 */
	private String loginLat;
	/**
	 * 区域代码
	 */
	private String loginAreaCode;
	/**
	 * 区域名
	 */
	private String loginAreaName;
	/**
	 * 手机APP 签名
	 */
	private String userSignature;
	/**
	 * 生日
	 */
	private String birthday;
	/**
	 * 最后登录时间
	 */
	private String userLastTime;
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