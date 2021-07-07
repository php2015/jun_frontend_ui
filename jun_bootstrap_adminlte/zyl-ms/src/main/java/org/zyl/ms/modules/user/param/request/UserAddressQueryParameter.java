package org.zyl.ms.modules.user.param.request;

import org.zyl.support.request.BaseQueryParameter;

/**
 * 用户地址管理 查询参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class UserAddressQueryParameter extends BaseQueryParameter {
	private long id;
	/**
	 * 用户Id
	 */
	private int userId;
	/**
	 * 收件人
	 */
	private String receiverName;
	/**
	 * 收件人电话
	 */
	private String receiverPhone;
	/**
	 * 省
	 */
	private String addrProvince;
	/**
	 * 市
	 */
	private String addrCity;
	/**
	 * 区/县
	 */
	private String addrArea;
	/**
	 * 详细地址
	 */
	private String addrDetail;
	/**
	 * 
	 */
	private String addrCode;
	/**
	 * 邮政编码
	 */
	private String addrPostcode;
	/**
	 * 
	 */
	private String tag;
	/**
	 * 是否默认 否   是 
	 */
	private String isDefault;
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
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public String getReceiverPhone() {
		return receiverPhone;
	}
	public void setReceiverPhone(String receiverPhone) {
		this.receiverPhone = receiverPhone;
	}
	public String getAddrProvince() {
		return addrProvince;
	}
	public void setAddrProvince(String addrProvince) {
		this.addrProvince = addrProvince;
	}
	public String getAddrCity() {
		return addrCity;
	}
	public void setAddrCity(String addrCity) {
		this.addrCity = addrCity;
	}
	public String getAddrArea() {
		return addrArea;
	}
	public void setAddrArea(String addrArea) {
		this.addrArea = addrArea;
	}
	public String getAddrDetail() {
		return addrDetail;
	}
	public void setAddrDetail(String addrDetail) {
		this.addrDetail = addrDetail;
	}
	public String getAddrCode() {
		return addrCode;
	}
	public void setAddrCode(String addrCode) {
		this.addrCode = addrCode;
	}
	public String getAddrPostcode() {
		return addrPostcode;
	}
	public void setAddrPostcode(String addrPostcode) {
		this.addrPostcode = addrPostcode;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(String isDefault) {
		this.isDefault = isDefault;
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