package org.zyl.ms.conf.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 系统参数
 * @author yzzhouyalei@foxmail.com
 * @time 2019-05-10 22:32:37
 */
@Component
@ConfigurationProperties(prefix = "zyl.system")
public class SystemProperties {
	private String jwtKey;
	private String imageHost;
	private String imageEndpoint;
	private String imageAccessKeyId;
	private String imageAccessKeySecret;
	private String imageBucketName;
	private String imageDefaultUserHead;

	public String getJwtKey() {
		return jwtKey;
	}
	public void setJwtKey(String jwtKey) {
		this.jwtKey = jwtKey;
	}
	public String getImageDefaultUserHead() {
		return imageDefaultUserHead;
	}
	public void setImageDefaultUserHead(String imageDefaultUserHead) {
		this.imageDefaultUserHead = imageDefaultUserHead;
	}
	public String getImageHost() {
		return imageHost;
	}
	public void setImageHost(String imageHost) {
		this.imageHost = imageHost;
	}
	public String getImageEndpoint() {
		return imageEndpoint;
	}
	public void setImageEndpoint(String imageEndpoint) {
		this.imageEndpoint = imageEndpoint;
	}
	public String getImageAccessKeyId() {
		return imageAccessKeyId;
	}
	public void setImageAccessKeyId(String imageAccessKeyId) {
		this.imageAccessKeyId = imageAccessKeyId;
	}
	public String getImageAccessKeySecret() {
		return imageAccessKeySecret;
	}
	public void setImageAccessKeySecret(String imageAccessKeySecret) {
		this.imageAccessKeySecret = imageAccessKeySecret;
	}
	public String getImageBucketName() {
		return imageBucketName;
	}
	public void setImageBucketName(String imageBucketName) {
		this.imageBucketName = imageBucketName;
	}
}