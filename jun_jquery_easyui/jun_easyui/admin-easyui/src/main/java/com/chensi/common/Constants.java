package com.chensi.common;

/**
 * 常量
 * @author Chason
 * @version 2016-5-29 下午7:39:46
 */
public class Constants {
	/** -------------------约定的基本参数------------------------ */
	/** ajax请求返回标识符 - 000000成功 */
	public static final String AJAX_SUCCESS = "000000";
	/** ajax请求返回标识符 - 000001失败 */
	public static final String AJAX_FAIL = "000001";
	/** ajax请求返回标识符 - 000002警告（允许通过请求） */
	public static final String AJAX_WARN = "000002";
	/** ajax请求返回标识符 - 000003没权限 */
	public static final String AJAX_NO_AUTH = "000003";
	/** ajax请求返回标识符 - 000004重定向 */
	public static final String AJAX_REDIRECT = "000004";
	/** 文件上传目录 eg:uploadFiles/ */
	public static final String UPLOAD_PATH = Global.getConfig("sys.uploadFile");
	/** web路径 eg: http://localhost:8080/ */
	public static final String WEB_PATH = Global.getConfig("sys.webPath");
	/** 默认分页大小 */
	public static final Integer PAGESIZE = 10;
	/** 最大值常量 */
	public static final Integer MAX = 999999999;
	/** 返回标准json的content-type */
	public static final String CONTENT_TYPE = "application/json;charset=UTF-8";
	/** token参数 */
	public static final String TOKEN = "token";
	/** 当前会话的用户 */
	public static final String LOGIN_USER = "loginUser";
	/** 当前会话的菜单 */
	public static final String LOGIN_MENU = "loginMenu";
	/** 男性 */
	public static final Integer SEX_MALE = 1;
	/** 女性 */
	public static final Integer SEX_FEMALE = 2;
	/** 用户正常状态 */
	public static final Integer USER_NORMAL = 0;
	/** 用户待审核状态 */
	public static final Integer USER_REVIEW = 1;
	/** 用户冻结状态 */
	public static final Integer USER_FROZEN = 2;
	/** 用户注销状态 */
	public static final Integer USER_DEL = 10;
	/** 用户是超级管理员 */
	public static final Integer USER_SUPER_Y = 1;
	/** 用户不是超级管理员 */
	public static final Integer USER_SUPER_N = 0;
	/** 默认菜单url */
	public static final String MENU_DEFAULT = "javascript:;";
	/** 菜单类型是菜单 */
	public static final Integer MENU_TYPE_MENU = 1;
	/** 菜单类型是按钮 */
	public static final Integer MENU_TYPE_BUTTON = 2;
	/** 菜单类型是接口 */
	public static final Integer MENU_TYPE_API = 3;
	/** 请确认信息输入完整 */
	public static final String NOT_BLANK = "请确认信息输入完整";
	/** 用户存在 */
	public static final String USER_EXIST = "该用户已存在";
	/** 匹配用户信息错误 */
	public static final String USER_ERROR = "用户名或密码错误";
	/** 验证码错误 */
	public static final String CAPTCHA_ERROR = "验证码错误";
	/** 角色存在 */
	public static final String ROLE_EXIST = "该角色已存在";
	/** 菜单码存在 */
	public static final String CODE_EXIST = "该字典码已存在";
	/** 禁止删除超级管理员 */
	public static final String NOT_DELETE_ADMIN = "不可删除超级管理员";
	/** 禁止删除自己 */
	public static final String NOT_DELETE_SELF = "不可删除自己";
	/** 存在关联信息，禁止删除 */
	public static final String NOT_DELETE = "存在关联信息，禁止删除";
	/** 无权限 */
	public static final String NO_AUTH = "对不起，您没有相应权限";

	/** ------------------可能需要动态配置的参数------------------------ */
	/** 默认密码 */
	public static final String DEFAULT_PASSWORD = "123456";
	/** 项目名 */
	public static final String APP_NAME = Global.getConfig("sys.appName");
	/** 默认顶级菜单名 */
	public static final String MENU_ROOT = "根目录";
	/** 默认顶级菜单的数据库id */
	public static final Integer MENU_ROOT_ID = 1;
	/** 静态文件-ztree的icon图标路径 */
	public static final String ICON_PATH = "/" + APP_NAME + "/static/H-ui.admin_v3.0/lib/zTree/v3/css/zTreeStyle/img/diy/";
	/** 静态文件-ztree默认icon */
	public static final String ICON_DEFAULT = "application.png";
	/** 静态文件-默认头像路径 */
	public static final String AVATAR_PATH = "images/head.png";

	/** ------------------Layim即时通讯参数------------------------ */
	/** 当前会话的socket用户 */
	public static final String SOCKET_USER_ID = "socketUserId";
	/** 报文类型-聊天消息 */
	public static final String SOCKET_CHAT = "chat";
	/** 报文类型-消息提醒 */
	public static final String SOCKET_NOTICE = "notice";
	/** 报文类型-超时 */
	public static final String SOCKET_OVERTIME = "overtime";
	/** 报文类型-上线 */
	public static final String SOCKET_ONLINE = "on";
	/** 报文类型-下线 */
	public static final String SOCKET_OFFLINE = "off";
	/** 聊天类型friend */
	public static final String SOCKET_CHAT_FRIEND = "friend";
	/** 聊天类型group */
	public static final String SOCKET_CHAT_GROUP = "group";
	/** 用户状态在线 */
	public static final String SOCKET_CHAT_ONLINE = "online";
	/** 用户状态隐身 */
	public static final String SOCKET_CHAT_HIDE = "hide";

	/** ------------------消息队列参数------------------------ */
	/** 点对点消息 */
	public static final String MQ_QUEUE = Global.getConfig("mq.queueName");
	/** 订阅主题消息 */
	public static final String MQ_TOPIC = Global.getConfig("mq.topicName");

}
