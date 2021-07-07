package com.chensi.socket;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.socket.TextMessage;

import com.chensi.common.AjaxJson;
import com.chensi.common.Constants;
import com.chensi.common.Global;
import com.chensi.common.LoginUser;
import com.chensi.model.User;
import com.chensi.service.IUserService;
import com.chensi.socket.model.AjaxSocket;
import com.chensi.socket.model.BaseUser;
import com.chensi.socket.model.Friend;
import com.chensi.socket.model.Group;
import com.chensi.socket.model.MessageReceive;
import com.chensi.util.CommonUtil;
/**
 * socket通信层
 * @author chensi
 * @version 2016-9-3 下午7:32:27
 */
@Controller
@RequestMapping("message")
public class MessageController {

	@Autowired
	MyWebSocketHandler handler;

	@Autowired
	private IUserService userService;

	/**
	 * 获取人员列表
	 * @param id
	 * @return
	 */
	@RequestMapping("list.do")
	@ResponseBody
	public AjaxSocket list(Integer id) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (id == null) {
			return AjaxSocket.getSuccessInfo(map);
		}
		// 获取我的信息
		User user = userService.get(id);
		BaseUser baseUser = new BaseUser();
		baseUser.setId(user.getId());
		baseUser.setAvatar("/" + Constants.APP_NAME + "/" + user.getAvatar());
		baseUser.setSign(user.getSign());
		baseUser.setUsername(user.getUsername());
		baseUser.setStatus(Constants.SOCKET_CHAT_ONLINE);
		baseUser.setName(user.getName());
		map.put("mine", baseUser);
		// 获取好友列表（friend.groupname为角色名，）
		// 此处约定用户好友为同角色的用户
		User param = new User();
		param.setRoleId(user.getRoleId());
		param.setStatus(Constants.USER_NORMAL);
		List<User> list = userService.listByEntity(param);
		for (User u : list) {
			u.setAvatar("/" + Constants.APP_NAME + "/" + u.getAvatar());
		}
		List<Friend> friendList = new ArrayList<Friend>();
		if (CommonUtil.isNotEmptyList(list)) {
			Friend f = new Friend();
			f.setGroupname(list.get(0).getRoleName());
			f.setId(list.get(0).getRoleId());
			f.setList(list);
			f.setOnline(list.size());
			friendList.add(f);
		}
		map.put("friend", friendList);
		// 约定群组为空
		List<Group> groupList = new ArrayList<Group>();
		Group g = new Group();
		g.setAvatar("/" + Constants.APP_NAME + "/images/group.png");
		groupList.add(g);
		map.put("group", groupList);
		return AjaxSocket.getSuccessInfo(map);
	}

	/**
	 * 广播页面
	 * @return
	 */
	@RequestMapping("viewBroadcast")
	public ModelAndView viewBroadcast() {
		return new ModelAndView("message/broadcast");
	}

	/**
	 * 消息广播
	 * @param text
	 * @return
	 */
	@RequestMapping("broadcast.do")
	@ResponseBody
	public AjaxJson broadcast(String text) {
		MessageReceive m = new MessageReceive();
		m.setEmit(Constants.SOCKET_NOTICE);
		m.setContent(text);
		try {
			handler.broadcast(new TextMessage(Global.gson.toJson(m)), null);
		} catch (IOException e) {
			e.printStackTrace();
			return AjaxJson.getFailInfo();
		}
		return AjaxJson.getSuccessInfo();
	}

	/**
	 * 更新好友状态
	 * @param id
	 * @return
	 */
	@RequestMapping("updateList.do")
	@ResponseBody
	public AjaxJson updateList() {
		LoginUser loginUser = (LoginUser) SecurityUtils.getSubject().getSession().getAttribute(Constants.LOGIN_USER);
		// 查询所有相同角色的用户
		User param = new User();
		param.setRoleId(loginUser.getRoleId());
		param.setStatus(Constants.USER_NORMAL);
		List<User> list = userService.listByEntity(param);
		List<Integer> ids = new ArrayList<Integer>();
		for (User u : list) {
			ids.add(u.getId());
		}
		// 移除当前用户
		ids.remove(loginUser.getId());
		// 移除在线的用户
		Iterator<Integer> it = ids.iterator();
		while (it.hasNext()) {
			Integer tmp = it.next();
			if (Global.userSocketSessionMap.get(tmp) != null && Global.userSocketSessionMap.get(tmp).isOpen()) {
				it.remove();
			}
		}
		return AjaxJson.getSuccessInfo(ids);
	}

	/**
	 * layim上传文件
	 * @param request
	 * @return
	 */
	@RequestMapping("upload.json")
	@ResponseBody
	public AjaxSocket upload(HttpServletRequest request) {
		try {
			if (!(request instanceof MultipartHttpServletRequest)) {
				return AjaxSocket.getFailInfo();
			}
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
			String relativePath = Constants.UPLOAD_PATH + new SimpleDateFormat("yyyy/MM/dd").format(new Date());// uploadFiles/2016/06/17
			String ctxPath = request.getSession().getServletContext().getRealPath("/") + relativePath;// D:\apache-tomcat-7.0.57\webapps\maintenanceServer\
			File dir = new File(ctxPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			String fileName = null;
			StringBuffer sb = new StringBuffer();
			for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
				// 上传文件名 //
				MultipartFile mf = entity.getValue();
				fileName = mf.getOriginalFilename();
				if ("".equals(fileName)) {
					continue;
				}
				String format = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				fileName = "" + System.currentTimeMillis() + CommonUtil.getRandomNum(6);
				File uploadFile = new File(ctxPath + "/" + fileName + format);
				FileCopyUtils.copy(mf.getBytes(), uploadFile);
				// 返回http://localhost:8080/app/upload/xxx.jpg格式
				sb.append(Constants.WEB_PATH + Constants.APP_NAME + "/" + relativePath + "/" + fileName + format + ",");
			}
			if ("".equals(sb.toString())) {
				return AjaxSocket.getFailInfo();
			}
			String result = sb.deleteCharAt(sb.lastIndexOf(",")).toString();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("src", result);
			return AjaxSocket.getSuccessInfo(map);
		} catch (IOException e) {
			e.printStackTrace();
			return AjaxSocket.getFailInfo();
		}
	}
}
