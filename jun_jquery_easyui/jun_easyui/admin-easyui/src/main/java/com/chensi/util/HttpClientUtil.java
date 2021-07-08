package com.chensi.util;

import java.util.Map;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.log4j.Logger;

/**
 * httpclient调用第三方接口
 * 
 * @author chensi
 * @version 2016-6-1 下午6:24:38
 */
public class HttpClientUtil {

	private static final Logger log = Logger.getLogger(HttpClientUtil.class);

	/**
	 * http post
	 * @param url
	 * @param params {key:value,key:value}
	 * @return
	 */
	public static String postHttp(String url, Map<String, String> params) {
		String responseMsg = null;
		PostMethod postMethod = new PostMethod(url);
		try {
			// 构造HttpClient的实例
			HttpClient httpClient = new HttpClient();
			// 把参数值放入到PostMethod对象中
			for (Map.Entry<String, String> entry : params.entrySet()) {
				postMethod.addParameter(entry.getKey(), entry.getValue());
			}
			// 设置请求上下文
			HttpMethodParams httpMethodParams = new HttpMethodParams();
			httpMethodParams.setContentCharset("UTF-8");
			postMethod.setParams(httpMethodParams);
			// 执行postMethod,调用http接口
			httpClient.executeMethod(postMethod);// 200
			// 读取内容
			responseMsg = postMethod.getResponseBodyAsString().trim();
			log.warn("调用第三方接口成功，代码为：【 " + responseMsg + "】");
		} catch (Exception e) {
			e.printStackTrace();
			log.error("************调用第三方接口失败************ ");
			throw new RuntimeException("************调用第三方接口失败************");
		} finally {
			// 释放连接
			postMethod.releaseConnection();
		}
		return responseMsg;
	}

}
