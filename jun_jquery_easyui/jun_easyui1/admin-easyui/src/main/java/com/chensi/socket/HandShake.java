package com.chensi.socket;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.chensi.common.Constants;
import com.chensi.common.LoginUser;

/**
 * Socket建立连接（握手）和断开
 * @author chensi
 * @version 2016-8-20 下午4:05:57
 */
public class HandShake implements HandshakeInterceptor {

	private static final Logger logger = LoggerFactory.getLogger(HandShake.class);

	/**
	 * （很重要）握手前把当前用户信息放到WebSocketSession中，让socket服务中获取用户身份
	 */
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes)
			throws Exception {
		if (request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession(false);
			if (session == null) {
				return false;
			}
			// 标记用户
			LoginUser user = (LoginUser) session.getAttribute(Constants.LOGIN_USER);
			if (user != null) {
				//放到webSocketSession中，可以通过getAttribute获取
				attributes.put(Constants.SOCKET_USER_ID, user.getId());
				logger.info("Websocket:用户[ID:{}]已经建立连接", user.getId());
			} else {
				return false;
			}
		}
		return true;
	}

	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

	}

}
