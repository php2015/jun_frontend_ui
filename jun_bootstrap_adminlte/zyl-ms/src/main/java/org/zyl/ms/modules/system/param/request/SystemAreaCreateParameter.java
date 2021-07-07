package org.zyl.ms.modules.system.param.request;

import org.zyl.support.annotation.constraints.Constraints;
import org.zyl.support.annotation.constraints.ConstraintsString;

/**
 * 系统地区表 创建参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-01-10 21:24:26
 */
public class SystemAreaCreateParameter {
	/**
	 * 地区编码
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String areaCode;
	/**
	 * 地区名
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String areaName;
	/**
	 * 地区级别（1:省份province,2:市city,3:区县district,4:街道street）
	 */
	private int areaLevel;
	/**
	 * 城市编码
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String cityCode;
	/**
	 * 城市中心点（即：经纬度坐标）
	 */
	@ConstraintsString(maxSize = 64, con = @Constraints(allowNull = true))
	private String cityCenter;
	/**
	 * 地区父节点
	 */
	private int areaParentId;

	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public int getAreaLevel() {
		return areaLevel;
	}
	public void setAreaLevel(int areaLevel) {
		this.areaLevel = areaLevel;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public String getCityCenter() {
		return cityCenter;
	}
	public void setCityCenter(String cityCenter) {
		this.cityCenter = cityCenter;
	}
	public int getAreaParentId() {
		return areaParentId;
	}
	public void setAreaParentId(int areaParentId) {
		this.areaParentId = areaParentId;
	}
}