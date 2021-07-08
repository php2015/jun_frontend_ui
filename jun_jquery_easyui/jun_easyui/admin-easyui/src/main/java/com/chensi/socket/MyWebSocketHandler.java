package com.chensi.socket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.chensi.common.Constants;
import com.chensi.common.Global;
import com.chensi.model.User;
import com.chensi.service.IUserService;
import com.chensi.socket.model.MessageReceive;
import com.chensi.socket.model.MessageSend;
import com.chensi.socket.model.Mine;
import com.chensi.socket.model.To;
import com.chensi.util.CommonUtil;

/**
 * Socket处理器
 * @author chensi
 * @version 2016-8-20 下午4:12:44
 */
@Component
public class MyWebSocketHandler implements WebSocketHandler {

	private static final Logger logger = LoggerFactory.getLogger(MyWebSocketHandler.class);

	@Autowired
	private IUserService userService;

	/**
	 * 建立连接后，session托管给全局map容器管理
	 */
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Integer uid = (Integer) session.getAttributes().get(Constants.SOCKET_USER_ID);
		if (Global.userSocketSessionMap.get(uid) == null) {
			Global.userSocketSessionMap.put(uid, session);
			// 上线提醒
			onOffLine(uid, Constants.SOCKET_ONLINE);
			logger.info("当前WebSocketSession数量为[{}]", Global.userSocketSessionMap.size());
		}
	}

	/**
	 * 消息处理，在客户端通过Websocket API发送的消息会经过这里，然后进行相应的处理 <br>
	 * session:发送者<br>
	 * message:消息体<br>
	 */
	@Override
	public void handleMessage(WebSocketSession sessionSource, WebSocketMessage<?> message) throws Exception {
		if (message.getPayloadLength() == 0) {
			return;
		}
		MessageSend send = Global.gson.fromJson(message.getPayload().toString(), MessageSend.class);
		// 报文类型是聊天信息
		if (StringUtils.equals(send.getType(), Constants.SOCKET_CHAT)) {
			To to = send.getTo();
			Mine mine = send.getMine();
			MessageReceive receive = new MessageReceive();
			receive.setEmit(send.getType());
			receive.setId(mine.getId());
			receive.setAvatar(mine.getAvatar());
			receive.setUsername(mine.getUsername());
			receive.setContent(send.getData());
			receive.setType(to.getType());
			WebSocketSession sessionTarget = Global.userSocketSessionMap.get(to.getId());
			if (sessionTarget != null && sessionTarget.isOpen()) {
				sessionTarget.sendMessage(new TextMessage(Global.gson.toJson(receive)));
			}
			return;
		}
	}

	/**
	 * 消息传输错误处理
	 */
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		if (session.isOpen()) {
			session.close();
		}
		Iterator<Entry<Integer, WebSocketSession>> it = Global.userSocketSessionMap.entrySet().iterator();
		while (it.hasNext()) {
			Entry<Integer, WebSocketSession> entry = it.next();
			if (entry.getValue().getId().equals(session.getId())) {
				Global.userSocketSessionMap.remove(entry.getKey());
				onOffLine(entry.getKey(), Constants.SOCKET_OFFLINE);
				logger.info("会话出错，已经移除:用户ID:" + entry.getKey());
				logger.info("当前WebSocketSession数量为[{}]", Global.userSocketSessionMap.size());
				break;
			}
		}
	}

	/**
	 * 关闭连接后
	 */
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		logger.info("Websocket:" + session.getId() + "已经关闭");
		Iterator<Entry<Integer, WebSocketSession>> it = Global.userSocketSessionMap.entrySet().iterator();
		while (it.hasNext()) {
			Entry<Integer, WebSocketSession> entry = it.next();
			if (entry.getValue().getId().equals(session.getId())) {
				Global.userSocketSessionMap.remove(entry.getKey());
				onOffLine(entry.getKey(), Constants.SOCKET_OFFLINE);
				logger.info("Socket会话已经移除:用户ID:" + entry.getKey());
				logger.info("当前WebSocketSession数量为[{}]", Global.userSocketSessionMap.size());
				break;
			}
		}
	}

	@Override
	public boolean supportsPartialMessages() {
		return false;
	}

	/**
	 * 上下线提醒
	 * @param id
	 * @param action
	 */
	private void onOffLine(Integer id, String action) {
		// 查询所有相同角色的用户
		User param = new User();
		param.setRoleId(userService.get(id).getRoleId());
		param.setStatus(Constants.USER_NORMAL);
		List<User> list = userService.listByEntity(param);
		List<Integer> ids = new ArrayList<Integer>();
		for (User u : list) {
			ids.add(u.getId());
		}
		// 移除当前用户
		ids.remove(id);
		// 群发下线通知
		MessageReceive receive = new MessageReceive();
		receive.setEmit(action);// 报文类型
		receive.setType(Constants.SOCKET_CHAT_FRIEND);// 朋友组
		receive.setId(id);
		try {
			broadcast(new TextMessage(Global.gson.toJson(receive)), ids);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 给所有在线用户发送消息
	 * @param message
	 * @throws IOException
	 */
	public void broadcast(final TextMessage message, final List<Integer> ids) throws IOException {
		if (CommonUtil.isNotEmptyList(ids)) {
			// 只发给指定ids的人员
			for (Integer i : ids) {
				if (Global.userSocketSessionMap.get(i) != null && Global.userSocketSessionMap.get(i).isOpen()) {
					Global.userSocketSessionMap.get(i).sendMessage(message);
				}
			}
			return;
		}
		Iterator<Entry<Integer, WebSocketSession>> it = Global.userSocketSessionMap.entrySet().iterator();
		// 多线程群发
		while (it.hasNext()) {
			final Entry<Integer, WebSocketSession> entry = it.next();
			if (entry.getValue().isOpen()) {
				// entry.getValue().sendMessage(message);
				new Thread(new Runnable() {
					public void run() {
						try {
							if (entry.getValue().isOpen()) {
								entry.getValue().sendMessage(message);
							}
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}).start();
			}
		}
	}

}
