/*
Navicat MySQL Data Transfer

Source Server         : yun
Source Server Version : 50528
Source Host           : 139.199.89.36:3506
Source Database       : db_blogboot

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-10-12 14:30:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bms_blog
-- ----------------------------
DROP TABLE IF EXISTS `bms_blog`;
CREATE TABLE `bms_blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `blog_desc` varchar(1000) DEFAULT NULL COMMENT '摘要',
  `blog_top` int(1) DEFAULT NULL,
  `blog_hot` int(1) DEFAULT NULL,
  `read_count` int(11) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `series_id` int(11) DEFAULT NULL,
  `catalog_id` int(11) DEFAULT NULL,
  `blog_img` varchar(255) DEFAULT NULL,
  `blog_author` int(11) DEFAULT NULL,
  `blog_state` int(1) DEFAULT NULL COMMENT '0 发布成功 ,1 为草稿',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `state` int(1) DEFAULT NULL COMMENT '0成功,1失败',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_blog
-- ----------------------------
INSERT INTO `bms_blog` VALUES ('1', '建站之Websocket的使用', 'WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：', '1', '1', '6', '1', null, '1', '/picture/1381e19a5fe742d6b82dd904741e1231.jpg', '2', '1', '2018-07-12 00:01:06', '2018-08-03 19:29:13', '1');
INSERT INTO `bms_blog` VALUES ('6', '测试测试测试', '测试测试测试测试测试测试', '1', '1', '4', '6', null, '1', '/picture/faae7906748f4302880fc939729569d9.png', '2', '1', '2018-07-18 00:04:30', '2018-07-18 00:05:02', null);
INSERT INTO `bms_blog` VALUES ('9', '测试文章添加', '测试文章添加', '1', '0', '3', '9', null, '1', null, '2', '1', '2018-07-22 09:19:29', '2018-07-22 09:19:29', null);
INSERT INTO `bms_blog` VALUES ('10', '测试文章添加111', '测试文章添加', '0', '0', '4', '10', null, '1', '/picture/faae7906748f4302880fc939729569d9.png', '2', '1', '2018-07-22 09:20:03', '2018-08-18 22:45:46', null);
INSERT INTO `bms_blog` VALUES ('11', '是打发斯蒂芬', '沙发上市地方撒旦法', '0', '1', '3', '11', null, '1', null, '2', '0', '2018-07-22 09:40:43', '2018-07-22 09:53:50', null);
INSERT INTO `bms_blog` VALUES ('12', '啊司法撒旦法撒旦法df', '地方撒旦发射阿方索大幅撒旦法撒旦法发送到撒旦法撒旦法法第三方撒旦法发多少 \n\n撒旦法撒旦法sad 撒旦法', '0', '0', '10', '12', '17', '6', '/picture/e1edd3f06ece4c36bb51ef6b34d09d71.jpg', '2', '1', '2018-08-05 13:03:08', '2018-09-08 10:17:16', null);
INSERT INTO `bms_blog` VALUES ('13', 'c测试文章   测试文章', 'c测试文章   测试文章c测试文章   测试文章c测试文章   测试文章', '1', '0', '17', '13', '17', '5', null, '2', '1', '2018-08-05 21:43:32', '2018-09-14 11:45:33', null);
INSERT INTO `bms_blog` VALUES ('15', '超级无敌大标题超级无敌大标题', '超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题', '0', '0', '12', '19', '1', '5', '/picture/17198c8b469a43e2ae46fd364dd5d0aa.jpg', '2', '1', '2018-09-18 12:36:16', '2018-09-18 12:36:16', null);

-- ----------------------------
-- Table structure for bms_catalog
-- ----------------------------
DROP TABLE IF EXISTS `bms_catalog`;
CREATE TABLE `bms_catalog` (
  `catalog_id` int(11) NOT NULL AUTO_INCREMENT,
  `catalog_name` varchar(255) DEFAULT NULL,
  `catalog_type` varchar(255) DEFAULT NULL,
  `catalog_desc` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`catalog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_catalog
-- ----------------------------
INSERT INTO `bms_catalog` VALUES ('1', 'spring', 'blog', 'spring', '2018-07-11 23:59:42', '2018-07-11 23:59:45');
INSERT INTO `bms_catalog` VALUES ('4', 'SpringBoot', 'blog', 'SpringBoot', '2018-08-05 13:01:14', '2018-08-05 13:01:14');
INSERT INTO `bms_catalog` VALUES ('5', '编程规范', 'blog', 'java代码规范', '2018-08-05 13:01:36', '2018-08-05 13:01:36');
INSERT INTO `bms_catalog` VALUES ('6', 'Mybatis', 'blog', 'Mybatis', '2018-08-07 23:43:00', '2018-08-07 23:43:00');

-- ----------------------------
-- Table structure for bms_content
-- ----------------------------
DROP TABLE IF EXISTS `bms_content`;
CREATE TABLE `bms_content` (
  `content_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `description` varchar(500) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_content
-- ----------------------------
INSERT INTO `bms_content` VALUES ('1', '<p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\">-- 以上节选自《百度百科》 --</em></p><p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\">-- 以上节选自《<a href=\"https://help.aliyun.com/document_detail/63421.html\" style=\"background-color: transparent; color: rgb(3, 102, 214);\">阿里云文档</a>》 --</em></p><p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\"https://gitee.com/yadong.zhang/DBlog\" style=\"background-color: transparent; color: rgb(3, 102, 214);\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\"menu_0\" style=\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\"></span></p><h2 id=\"-\" style=\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\">一、在线用户统计</h2><p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\"menu_1\" style=\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\"></span></p><h3 id=\"-websocket-\" style=\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\">编写websocket服务端</h3><p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">首先，编写websocket服务端。</p><p style=\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\">添加pom依赖</p><pre><code>import org.springframework.context.annotation.Bean;<br>import org.springframework.context.annotation.Configuration;<br>import org.springframework.web.socket.server.standard.ServerEndpointExporter;<br><br>/**<br> * websocket配置类<br> *<br> * @author yadong.zhang (yadong.zhang0415(a)gmail.com)<br> * @version 1.0<br> * @website https://www.zhyd.me<br> * @date 2018/4/18 11:48<br> * @since 1.0<br> */<br>@Configuration<br>public class WebSocketConfig {<br><br>    /**<br>     * ServerEndpointExporter会自动注册使用了@ServerEndpoint注解声明的Websocket endpoint<br>     * @return<br>     */<br>    @Bean<br>    public ServerEndpointExporter serverEndpointExporter() {<br>        return new ServerEndpointExporter();<br>    }<br><br>}</code></pre><pre style=\"overflow: auto; font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; padding: 16px; margin-top: 0px; margin-bottom: 16px; line-height: 1.45; color: rgb(51, 51, 51); word-break: break-all; word-wrap: normal; background-color: rgb(246, 248, 250); border: 0px solid rgb(204, 204, 204); border-radius: 3px;\"><code style=\"font-family: SFMono-Regular, Consolas, &quot;Liberation Mono&quot;, Menlo, Courier, monospace; font-size: 13.6px; padding: 0px; color: inherit; background: 0px 0px transparent; white-space: pre; margin-right: 0px; margin-left: 0px; word-break: normal; border: 0px; display: inline; overflow: visible; line-height: inherit; word-wrap: normal;\">  <span style=\"color: rgb(153, 153, 136); font-style: italic;\">/**\n     * 向客户端发送消息\n     *\n     * <span style=\"color: rgb(221, 17, 68);\">@param</span> message\n     *         消息内容\n     * <span style=\"color: rgb(221, 17, 68);\">@param</span> session\n     *         客户端session\n     * <span style=\"color: rgb(221, 17, 68);\">@throws</span> IOException\n     */</span>\n    <span style=\"font-weight: bold;\">public</span> <span style=\"font-weight: bold;\">static</span> <span style=\"font-weight: bold;\">void</span> <span style=\"color: rgb(153, 0, 0); font-weight: bold;\">sendMessage</span>(String message, Session session) {\n        <span style=\"font-weight: bold;\">try</span> {\n            session.getAsyncRemote().sendText(message);\n        } <span style=\"font-weight: bold;\">catch</span> (Exception e) {\n            log.error(<span style=\"color: rgb(221, 17, 68);\">\"websocket--&gt;向客户端发送数据发生异常\"</span>, e);\n        }\n    }</code></pre>', '33333eeee', '啊444', '2018-07-12 00:01:55', '2018-09-03 17:26:30');
INSERT INTO `bms_content` VALUES ('2', '<p>测试内容</p><p><br></p><p><br></p><p>阿斯顿发顺丰</p><p><img src=\"/picture/bc61e31e075e486f80bb3192aee51f45.png\" style=\"max-width:100%;\"><br></p>', null, null, '2018-07-17 00:01:43', '2018-07-17 00:01:43');
INSERT INTO `bms_content` VALUES ('3', '<p>asdfasafs<span style=\"color: rgb(194, 79, 74);\">a的说法撒</span><span style=\"font-weight: bold;\"><span style=\"color: rgb(194, 79, 74);\">旦</span>法撒旦法撒旦法发</span></p>', null, null, null, null);
INSERT INTO `bms_content` VALUES ('5', '<p>撒旦飞洒发斯蒂芬撒旦法发的</p><p>撒旦法撒旦法<img src=\"/picture/fb5003edeaa44aed8c7dfdd97847d1e6.png\" style=\"max-width: 100%;\"></p>', null, null, '2018-07-17 23:57:44', '2018-07-17 23:57:44');
INSERT INTO `bms_content` VALUES ('6', '<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>', null, null, '2018-07-18 00:04:28', '2018-07-18 00:04:28');
INSERT INTO `bms_content` VALUES ('7', '<p>撒大大发大幅度发</p>', null, null, '2018-07-18 14:38:33', '2018-07-18 14:38:33');
INSERT INTO `bms_content` VALUES ('8', '<p>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试啊</p>', null, null, '2018-07-18 18:17:29', '2018-07-18 18:17:29');
INSERT INTO `bms_content` VALUES ('9', '<p>测试文章添加测试文章添加测试文章添加</p><p><span style=\"font-weight: bold;\">测试文章添加</span><br></p><p><span style=\"font-weight: bold;\"><br></span></p><p><span style=\"font-weight: bold;\">发放时</span>测试文章添加测<span style=\"color: rgb(194, 79, 74);\">试文章添加测试</span>文章添加</p><pre><code>@Log(\"博客保存\")<br>    @ResponseBody<br>    @PostMapping(\"/\")<br>    public Object save(Blog blog){<br>    	User user = ShiroUtils.getUser();<br>    	if(BUtil.isNull(blog)){<br>    		return ResponseModel.Failure(\"内容不能为空\");<br>    	}<br>    	if(BUtil.isNull(user)){<br>    		return ResponseModel.Failure(\"请先登录。\");<br>    	}<br>    	//<br>    	String tags = request.getParameter(\"blogTag\");<br>    	String content = request.getParameter(\"contentHtml\");<br>    	Content con = new Content();<br>    	con.setContent(content);<br>    	blog.setContent(con);<br>    	blog.setBlogAuthor(user.getId());<br>    	int num = blogService.save(blog,tags);<br>    	if(num&gt;0){<br>    		return ResponseModel.Success(\"保存成功\");<br>    	}<br>    	return ResponseModel.Failure(\"保存失败\");<br>    }</code></pre><p>单点</p><p><img src=\"/picture/7edca0a924294fcd981330d43ff28135.png\" style=\"max-width:100%;\"><br></p>', null, null, '2018-07-22 09:19:29', '2018-07-22 09:19:29');
INSERT INTO `bms_content` VALUES ('10', '<p>测试文章添加测试文章添加测试文章添加</p><p><span style=\"font-weight: bold;\">测试文章添加</span><br></p><p><span style=\"font-weight: bold;\"><br></span></p><p><span style=\"font-weight: bold;\">发放时</span>测试文章添加测<span style=\"color: rgb(194, 79, 74);\">试文章添加测试</span>文章添加</p><pre><code>@Log(\"博客保存\")<br>    @ResponseBody<br>    @PostMapping(\"/\")<br>    public Object save(Blog blog){<br>    	User user = ShiroUtils.getUser();<br>    	if(BUtil.isNull(blog)){<br>    		return ResponseModel.Failure(\"内容不能为空\");<br>    	}<br>    	if(BUtil.isNull(user)){<br>    		return ResponseModel.Failure(\"请先登录。\");<br>    	}<br>    	//<br>    	String tags = request.getParameter(\"blogTag\");<br>    	String content = request.getParameter(\"contentHtml\");<br>    	Content con = new Content();<br>    	con.setContent(content);<br>    	blog.setContent(con);<br>    	blog.setBlogAuthor(user.getId());<br>    	int num = blogService.save(blog,tags);<br>    	if(num&gt;0){<br>    		return ResponseModel.Success(\"保存成功\");<br>    	}<br>    	return ResponseModel.Failure(\"保存失败\");<br>    }</code></pre><p>单点</p><p><img src=\"/picture/7edca0a924294fcd981330d43ff28135.png\" style=\"max-width:100%;\"><br></p>', null, null, '2018-07-22 09:20:03', '2018-07-22 09:20:03');
INSERT INTO `bms_content` VALUES ('11', '<p>撒旦法师大发萨芬的是</p>', null, null, '2018-07-22 09:40:43', '2018-07-22 09:40:43');
INSERT INTO `bms_content` VALUES ('12', '<p>asfsa</p>', '地方撒旦发射阿方索大幅撒旦法撒旦法发送到撒旦法撒旦法法第三方撒旦法发多少 \n\n撒旦法撒旦法sad 撒旦法', '毕业设计,mybatis', '2018-08-05 13:03:08', '2018-09-08 10:17:16');
INSERT INTO `bms_content` VALUES ('13', '<p>撒旦法萨芬的</p>', 'dsadsafaf', 'afsa', '2018-08-05 21:43:32', '2018-09-07 14:52:20');
INSERT INTO `bms_content` VALUES ('14', '<p>第一篇文章博客，是不是要高端大气上档次一点呢。</p><p><br></p><p>第一<span style=\"color: rgb(194, 79, 74);\">篇文章博</span>客，是不<span style=\"text-decoration-line: underline;\">是要高端大气上</span>档次一点呢。</p><p><img src=\"/picture/104b1b6ad59e44b4b1f97db66ab680ce.jpg\" style=\"max-width:100%;\"><br></p><p><br></p><pre><code>System.out.println(\"Hello,My Blog\");</code></pre><p><br></p><p><br></p>', null, null, '2018-08-07 23:48:23', '2018-08-07 23:48:23');
INSERT INTO `bms_content` VALUES ('15', null, '专题', '专题,Java', '2018-08-17 19:53:20', '2018-09-02 01:01:11');
INSERT INTO `bms_content` VALUES ('16', '<p><br></p><p><br></p><p><br></p><h3>关于我们，简单一句</h3><p><br></p><p><span style=\"font-weight: bold;\">QQ：904274014</span></p><p><span style=\"font-weight: bold;\"></span><br></p><p>邮箱地址：</p><p><br></p><p><img src=\"/picture/8dd5f04fc72343e6b60edca08fec2edd.jpg\" style=\"max-width:100%;\"><br></p>', '', '关于我们', '2018-09-03 17:09:16', '2018-09-18 18:40:56');
INSERT INTO `bms_content` VALUES ('17', null, 'java博客管理系统', 'java博客,java技术分享', '2018-09-03 21:02:01', '2018-09-03 21:02:01');
INSERT INTO `bms_content` VALUES ('18', null, 'java技术专题,技术分享,java', 'java技术专题,技术分享,java', '2018-09-03 21:03:26', '2018-09-03 21:03:26');
INSERT INTO `bms_content` VALUES ('19', '<p><span>超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题</span></p><p><br></p><p><span>暗室逢灯</span><br></p><p><span><br></span></p><h1><span>这里是标题1</span></h1><div><span>正文</span></div><h2>这里是标题2</h2><p>正文</p><h3>这里是标题3</h3><p>正文</p><h4>这里是标题4</h4><p><img src=\"/picture/0fa4af364a1d4c209c92be8aeb9f9f5a.png\"><br></p><p><br></p><p><br></p><p>师大发发</p><p><br></p><pre><code>&lt;div th:fragment=\"detail\" class=\"fly-panel detail-box\"&gt;<br>	&lt;h1 th:text=\"${blog.title}\"&gt;博客标题&lt;/h1&gt;<br>	&lt;div class=\"fly-detail-info\"&gt;<br>		<br>		&lt;span th:if=\"${blog.blogTop}==1\" class=\"layui-badge layui-bg-black\"&gt;置顶&lt;/span&gt;<br>		&lt;span th:if=\"${blog.blogHot}==1\" class=\"layui-badge layui-bg-red\"&gt;推荐&lt;/span&gt;<br>		&lt;span&gt; &lt;i class=\"fa fa-clock\" title=\"时间\"&gt;&lt;/i&gt;&lt;span th:text=\"\'&nbsp;\'+${#dates.format(blog.createDate,\'yyyy-MM-dd hh:mm:ss\')}\"&gt;&lt;/span&gt;&lt;/span&gt;<br>		 &lt;span&gt; &lt;i class=\"fa fa-user\" title=\"作者\"&gt;&lt;/i&gt;&lt;span th:text=\"\'&nbsp;\'+${blog.userName}\"&gt; admin&lt;/span&gt;&lt;/span&gt;<br>		 &lt;span&gt; &lt;i class=\"fa fa-tasks\" title=\"分类\"&gt;&lt;/i&gt;&lt;span th:text=\"\'&nbsp;\'+${blog.catalog.catalogName}\"&gt;Java&lt;/span&gt;&lt;/span&gt; <br>		 &lt;span class=\"fly-list-nums\"&gt; &lt;i class=\"fa fa-eye\" title=\"浏览\"&gt;&lt;/i&gt;&lt;span th:text=\"${blog.readCount}\"&gt;99999&lt;/span&gt;<br>			<br>		&lt;/span&gt;<br>	&lt;/div&gt;<br><br>	&lt;!-- 内容区 --&gt;<br>	&lt;div class=\"detail-body photos\" th:utext=\"${blog.content.content}\"&gt;<br>		<br>	&lt;/div&gt;<br>	&lt;!-- 内容区结束 --&gt;<br>	&lt;!-- 内容结尾声明  begin--&gt;<br>	&lt;div class=\"detail-about\"&gt;<br>		&lt;!--&lt;a class=\"fly-avatar\" href=\"https://www.yuqh.vip/user/home?userid=1527128798263700\"&gt;<br>								&lt;img src=\"img/userImg.jpg\" alt=\"\"&gt;<br>							&lt;/a&gt;--&gt;<br>		&lt;div class=\"fly-detail-tag\"&gt;<br>			&lt;span&gt;内容标签：&lt;/span&gt; <br>			&lt;a th:href=\"\'/blog/tag/\'+${tag.tagId}\" th:each=\"tag:${blog.tags}\" th:text=\"${tag.tagName}\" class=\"layui-badge layui-bg-cyan layui-hide-xs\"&gt;JAVA&lt;/a&gt; <br>		&lt;/div&gt;<br>		&lt;div class=\"fly-detail-bq\"&gt;<br>			&lt;span&gt;版权申明：&lt;/span&gt; 本站原创文章，于2018年07月18日由Javabb发布，转载请注明出处<br>		&lt;/div&gt;<br>	&lt;/div&gt;<br>	&lt;!-- 内容结尾声明  end--&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"fly-panel detail-box animated fadeInUp\" id=\"flyReply\"&gt;<br>	&lt;fieldset class=\"layui-elem-field layui-field-title\"<br>		style=\"text-align: center;\"&gt;<br>		&lt;legend&gt;回复区&lt;/legend&gt;<br>	&lt;/fieldset&gt;<br>	&lt;p&gt;这里是回复区域&lt;/p&gt;<br>&lt;/div&gt;</code></pre><p><br></p><p><br></p><p>代码</p>', '超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题超级无敌大标题', '', '2018-09-18 12:36:16', '2018-09-18 12:36:16');

-- ----------------------------
-- Table structure for bms_post_tag
-- ----------------------------
DROP TABLE IF EXISTS `bms_post_tag`;
CREATE TABLE `bms_post_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_post_tag
-- ----------------------------
INSERT INTO `bms_post_tag` VALUES ('7', '6', '1', '2018-07-18 00:04:33', '2018-07-18 00:04:33');
INSERT INTO `bms_post_tag` VALUES ('8', '6', '6', '2018-07-18 00:04:36', '2018-07-18 00:04:36');
INSERT INTO `bms_post_tag` VALUES ('13', '9', '46', '2018-07-22 09:19:29', '2018-07-22 09:19:29');
INSERT INTO `bms_post_tag` VALUES ('14', '9', '4', '2018-07-22 09:19:29', '2018-07-22 09:19:29');
INSERT INTO `bms_post_tag` VALUES ('15', '9', '1', '2018-07-22 09:19:29', '2018-07-22 09:19:29');
INSERT INTO `bms_post_tag` VALUES ('19', '10', '46', '2018-07-22 09:36:18', '2018-07-22 09:36:18');
INSERT INTO `bms_post_tag` VALUES ('20', '10', '4', '2018-07-22 09:36:18', '2018-07-22 09:36:18');
INSERT INTO `bms_post_tag` VALUES ('21', '10', '1', '2018-07-22 09:36:18', '2018-07-22 09:36:18');
INSERT INTO `bms_post_tag` VALUES ('28', '11', '4', '2018-07-22 09:53:50', '2018-07-22 09:53:50');
INSERT INTO `bms_post_tag` VALUES ('29', '11', '1', '2018-07-22 09:53:50', '2018-07-22 09:53:50');
INSERT INTO `bms_post_tag` VALUES ('42', '1', '2', '2018-08-03 19:29:13', '2018-08-03 19:29:13');
INSERT INTO `bms_post_tag` VALUES ('43', '1', '3', '2018-08-03 19:29:13', '2018-08-03 19:29:13');
INSERT INTO `bms_post_tag` VALUES ('46', '13', '3', '2018-09-07 14:52:20', '2018-09-07 14:52:20');
INSERT INTO `bms_post_tag` VALUES ('47', '13', '2', '2018-09-07 14:52:20', '2018-09-07 14:52:20');
INSERT INTO `bms_post_tag` VALUES ('50', '12', '2', '2018-09-08 10:17:16', '2018-09-08 10:17:16');
INSERT INTO `bms_post_tag` VALUES ('51', '12', '3', '2018-09-08 10:17:16', '2018-09-08 10:17:16');

-- ----------------------------
-- Table structure for bms_series
-- ----------------------------
DROP TABLE IF EXISTS `bms_series`;
CREATE TABLE `bms_series` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `series_name` varchar(255) NOT NULL,
  `series_img` varchar(255) DEFAULT NULL,
  `series_desc` varchar(255) NOT NULL,
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_series
-- ----------------------------
INSERT INTO `bms_series` VALUES ('1', 'WebService入门', '', 'WebService入门', '1', '2018-08-12 18:33:50', '2018-09-01 19:53:23');
INSERT INTO `bms_series` VALUES ('2', 'Spring入门', null, 'Spring入门', '2', '2018-08-12 18:34:17', '2018-08-12 18:34:20');
INSERT INTO `bms_series` VALUES ('17', '一头扎进SpringBoot', '', '一头扎进SpringBoot，从搭建环境到构建Springboot项目。', '3', '2018-09-01 19:50:03', '2018-09-01 19:50:03');
INSERT INTO `bms_series` VALUES ('18', '一头扎进SpringMVC', '', '一头扎进SpringMVC', '5', '2018-09-01 19:50:35', '2018-09-01 19:50:35');
INSERT INTO `bms_series` VALUES ('19', 'Maven入门到精通', '', 'Apache Maven，是一个软件（特别是Java软件）项目管理及自动构建工具，由Apache软件基金会所提供。基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。', '34', '2018-09-08 20:41:59', '2018-09-08 20:41:59');

-- ----------------------------
-- Table structure for bms_tag
-- ----------------------------
DROP TABLE IF EXISTS `bms_tag`;
CREATE TABLE `bms_tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  `tag_type` varchar(255) DEFAULT NULL COMMENT '类别,blog，src',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bms_tag
-- ----------------------------
INSERT INTO `bms_tag` VALUES ('1', 'spring', 'blog', '2018-07-13 18:43:11', '2018-07-13 18:43:13', '1');
INSERT INTO `bms_tag` VALUES ('2', 'mybatis', 'blog', '2018-07-13 18:44:09', '2018-07-13 18:44:11', '1');
INSERT INTO `bms_tag` VALUES ('3', '毕业设计', 'blog', '2018-07-13 19:29:36', '2018-07-13 19:29:39', '1');
INSERT INTO `bms_tag` VALUES ('4', 'springboot', 'blog', '2018-07-13 19:44:18', '2018-07-13 19:44:20', null);
INSERT INTO `bms_tag` VALUES ('40', 'aa', 'blog', '2018-09-08 11:50:10', '2018-09-08 11:50:10', null);

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_code` varchar(100) NOT NULL,
  `config_value` varchar(100) DEFAULT NULL,
  `config_type` varchar(100) DEFAULT NULL,
  `config_desc` varchar(100) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES ('1', 'projectName', 'BMS管理系统', 'system', '项目名称', '2018-05-28 22:43:45', '2018-06-13 14:42:03', '1');
INSERT INTO `sys_config` VALUES ('4', 'pictureUploadPath', 'D:\\upload\\img\\', 'image', '图片上传路径', '2018-08-18 23:07:31', '2018-09-15 21:47:02', '0');
INSERT INTO `sys_config` VALUES ('5', 'imageShuiyin', '1', 'image', '图片水印开关', '2018-08-22 23:23:40', '2018-08-23 09:14:15', '0');
INSERT INTO `sys_config` VALUES ('6', 'imageShuiyinText', 'www.javabb.cn', 'image', '图片水印文字', '2018-08-22 23:24:02', '2018-08-23 09:14:10', '0');
INSERT INTO `sys_config` VALUES ('7', 'imageShuiyinMinWidth', '200', 'image', '水印图片最小宽度', '2018-08-23 09:13:34', '2018-08-23 12:21:28', '0');
INSERT INTO `sys_config` VALUES ('8', 'imageShuiyinMinHeight', '200', 'image', '水印图片最小高度', '2018-08-23 09:14:04', '2018-08-23 12:21:34', '0');
INSERT INTO `sys_config` VALUES ('9', 'imageOutPutQuality', '0.5', 'image', '0-1之间，1是原样输出，', '2018-08-23 15:46:02', '2018-08-23 15:46:02', '0');

-- ----------------------------
-- Table structure for sys_image
-- ----------------------------
DROP TABLE IF EXISTS `sys_image`;
CREATE TABLE `sys_image` (
  `id` varchar(32) NOT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `image_src` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `size` double DEFAULT NULL,
  `image_md5` varchar(60) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_image
-- ----------------------------
INSERT INTO `sys_image` VALUES ('17198c8b469a43e2ae46fd364dd5d0aa', '17198c8b469a43e2ae46fd364dd5d0aa.jpg', 'D:\\upload\\img\\\\17198c8b469a43e2ae46fd364dd5d0aa.jpg', '316', '300', '12.7880859375', '2333bf3146fe58bacb330e749038cf70', '1', '2018-09-15 21:47:19', '2018-09-15 21:47:19');
INSERT INTO `sys_image` VALUES ('89657ba602f848b0a4b69bfeaedfc89f', '89657ba602f848b0a4b69bfeaedfc89f.jpg', 'D:\\upload\\img\\89657ba602f848b0a4b69bfeaedfc89f.jpg', '200', '200', '4.76953125', '80f72eb3ac9f6b79716cf4e7d2d5b38a', '1', '2018-09-15 21:42:45', '2018-09-15 21:42:45');

-- ----------------------------
-- Table structure for sys_link
-- ----------------------------
DROP TABLE IF EXISTS `sys_link`;
CREATE TABLE `sys_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_name` varchar(255) NOT NULL,
  `link_url` varchar(255) NOT NULL,
  `contact_qq` varchar(13) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `link_site` varchar(255) DEFAULT NULL COMMENT '本站url所在页面',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_link
-- ----------------------------
INSERT INTO `sys_link` VALUES ('1', 'JavaEE毕业设计', 'http://www.javabb.cn', '904274014', 'imqinbao', '1', '2018-08-10 17:15:11', '2018-08-10 17:15:40');
INSERT INTO `sys_link` VALUES ('2', 'Java大巴', 'http://www.javadaba.com', '904274014', 'imqinbao@163.com', 'http://www.javadaba.com', '2018-08-10 17:47:01', '2018-08-10 17:47:35');

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(32) DEFAULT NULL,
  `operation` varchar(500) DEFAULT NULL,
  `method` varchar(200) DEFAULT NULL,
  `params` text,
  `use_time` int(11) DEFAULT NULL,
  `ip` varchar(200) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
INSERT INTO `sys_log` VALUES ('1', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '97', '127.0.0.1', '2018-07-17 23:50:14', '2018-07-17 23:50:14');
INSERT INTO `sys_log` VALUES ('2', 'javabb', '博客热点更新', 'cn.javabb.content.controller.admin.BlogAdminController.updataHot()', null, '255', '127.0.0.1', '2018-07-18 00:05:02', '2018-07-18 00:05:02');
INSERT INTO `sys_log` VALUES ('3', 'javabb', '保存用户信息', 'cn.javabb.sys.controller.UserController.saveOrUpdate()', null, '74', '127.0.0.1', '2018-07-18 00:05:40', '2018-07-18 00:05:40');
INSERT INTO `sys_log` VALUES ('4', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '74', '127.0.0.1', '2018-07-18 08:50:07', '2018-07-18 08:50:07');
INSERT INTO `sys_log` VALUES ('5', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '182', '127.0.0.1', '2018-07-18 09:30:41', '2018-07-18 09:30:41');
INSERT INTO `sys_log` VALUES ('6', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '145', '127.0.0.1', '2018-07-18 09:35:05', '2018-07-18 09:35:05');
INSERT INTO `sys_log` VALUES ('7', 'javabb', '博客热点更新', 'cn.javabb.content.controller.admin.BlogAdminController.updataHot()', null, '326', '127.0.0.1', '2018-07-18 09:51:45', '2018-07-18 09:51:45');
INSERT INTO `sys_log` VALUES ('8', 'javabb', '博客热点更新', 'cn.javabb.content.controller.admin.BlogAdminController.updataHot()', null, '36', '127.0.0.1', '2018-07-18 09:52:07', '2018-07-18 09:52:07');
INSERT INTO `sys_log` VALUES ('9', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '299', '127.0.0.1', '2018-07-18 10:49:43', '2018-07-18 10:49:43');
INSERT INTO `sys_log` VALUES ('10', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '434', '127.0.0.1', '2018-07-18 14:35:01', '2018-07-18 14:35:01');
INSERT INTO `sys_log` VALUES ('11', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '66', '127.0.0.1', '2018-07-18 14:57:27', '2018-07-18 14:57:27');
INSERT INTO `sys_log` VALUES ('12', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '49', '127.0.0.1', '2018-07-18 17:10:26', '2018-07-18 17:10:26');
INSERT INTO `sys_log` VALUES ('13', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '1087', '127.0.0.1', '2018-07-18 17:20:17', '2018-07-18 17:20:17');
INSERT INTO `sys_log` VALUES ('14', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '886', '127.0.0.1', '2018-07-21 14:55:27', '2018-07-21 14:55:27');
INSERT INTO `sys_log` VALUES ('15', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '375', '127.0.0.1', '2018-07-21 17:18:22', '2018-07-21 17:18:22');
INSERT INTO `sys_log` VALUES ('16', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '83', '127.0.0.1', '2018-07-21 19:13:25', '2018-07-21 19:13:25');
INSERT INTO `sys_log` VALUES ('17', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '292', '127.0.0.1', '2018-07-21 21:41:33', '2018-07-21 21:41:33');
INSERT INTO `sys_log` VALUES ('18', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '58', '127.0.0.1', '2018-07-21 21:58:04', '2018-07-21 21:58:04');
INSERT INTO `sys_log` VALUES ('19', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '347', '127.0.0.1', '2018-07-21 23:31:47', '2018-07-21 23:31:47');
INSERT INTO `sys_log` VALUES ('20', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '2129', '127.0.0.1', '2018-07-22 00:04:23', '2018-07-22 00:04:23');
INSERT INTO `sys_log` VALUES ('21', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '569', '127.0.0.1', '2018-07-22 00:04:24', '2018-07-22 00:04:24');
INSERT INTO `sys_log` VALUES ('22', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '180', '127.0.0.1', '2018-07-22 00:05:33', '2018-07-22 00:05:33');
INSERT INTO `sys_log` VALUES ('23', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '245', '127.0.0.1', '2018-07-22 09:17:41', '2018-07-22 09:17:41');
INSERT INTO `sys_log` VALUES ('24', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '348', '127.0.0.1', '2018-07-22 09:19:29', '2018-07-22 09:19:29');
INSERT INTO `sys_log` VALUES ('25', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '443', '127.0.0.1', '2018-07-22 09:20:03', '2018-07-22 09:20:03');
INSERT INTO `sys_log` VALUES ('26', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '347', '127.0.0.1', '2018-07-22 09:36:19', '2018-07-22 09:36:19');
INSERT INTO `sys_log` VALUES ('27', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '397', '127.0.0.1', '2018-07-22 09:40:43', '2018-07-22 09:40:43');
INSERT INTO `sys_log` VALUES ('28', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '234', '127.0.0.1', '2018-07-22 09:41:02', '2018-07-22 09:41:02');
INSERT INTO `sys_log` VALUES ('29', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '260', '127.0.0.1', '2018-07-22 09:41:15', '2018-07-22 09:41:15');
INSERT INTO `sys_log` VALUES ('30', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '421', '127.0.0.1', '2018-07-22 09:53:50', '2018-07-22 09:53:50');
INSERT INTO `sys_log` VALUES ('31', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '121', '127.0.0.1', '2018-07-22 22:00:13', '2018-07-22 22:00:13');
INSERT INTO `sys_log` VALUES ('32', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '376', '127.0.0.1', '2018-07-23 12:27:36', '2018-07-23 12:27:36');
INSERT INTO `sys_log` VALUES ('33', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '51', '127.0.0.1', '2018-07-23 12:28:07', '2018-07-23 12:28:07');
INSERT INTO `sys_log` VALUES ('34', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '57', '127.0.0.1', '2018-07-23 12:42:59', '2018-07-23 12:42:59');
INSERT INTO `sys_log` VALUES ('35', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '76', '127.0.0.1', '2018-07-23 12:51:00', '2018-07-23 12:51:00');
INSERT INTO `sys_log` VALUES ('36', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '348', '127.0.0.1', '2018-07-23 13:46:10', '2018-07-23 13:46:10');
INSERT INTO `sys_log` VALUES ('37', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '338', '127.0.0.1', '2018-07-23 14:54:44', '2018-07-23 14:54:44');
INSERT INTO `sys_log` VALUES ('38', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '73', '127.0.0.1', '2018-07-26 14:47:54', '2018-07-26 14:47:54');
INSERT INTO `sys_log` VALUES ('39', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '125', '127.0.0.1', '2018-07-28 16:19:17', '2018-07-28 16:19:17');
INSERT INTO `sys_log` VALUES ('40', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '1195', '127.0.0.1', '2018-07-28 22:44:16', '2018-07-28 22:44:16');
INSERT INTO `sys_log` VALUES ('41', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '174', '127.0.0.1', '2018-07-28 22:44:16', '2018-07-28 22:44:16');
INSERT INTO `sys_log` VALUES ('42', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '90', '127.0.0.1', '2018-07-28 22:45:58', '2018-07-28 22:45:58');
INSERT INTO `sys_log` VALUES ('43', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '119', '127.0.0.1', '2018-07-28 23:29:04', '2018-07-28 23:29:04');
INSERT INTO `sys_log` VALUES ('44', 'javabb', '保存用户信息', 'cn.javabb.sys.controller.UserController.saveOrUpdate()', null, '28', '127.0.0.1', '2018-07-29 00:04:02', '2018-07-29 00:04:02');
INSERT INTO `sys_log` VALUES ('45', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '267', '127.0.0.1', '2018-07-29 09:18:05', '2018-07-29 09:18:05');
INSERT INTO `sys_log` VALUES ('46', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '127', '127.0.0.1', '2018-07-30 00:14:04', '2018-07-30 00:14:04');
INSERT INTO `sys_log` VALUES ('47', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '66', '127.0.0.1', '2018-07-30 23:07:27', '2018-07-30 23:07:27');
INSERT INTO `sys_log` VALUES ('48', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '53', '127.0.0.1', '2018-08-03 19:09:07', '2018-08-03 19:09:07');
INSERT INTO `sys_log` VALUES ('49', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', '{\"blogAuthor\":2,\"blogDesc\":\"WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：\",\"blogHot\":1,\"blogImg\":\"/picture/1381e19a5fe742d6b82dd904741e1231.jpg\",\"blogState\":1,\"blogTop\":1,\"catalogId\":1,\"content\":{\"content\":\"嗷嗷嗷<p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《百度百科》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《<a href=\\\"https://help.aliyun.com/document_detail/63421.html\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">阿里云文档</a>》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\\\"https://gitee.com/yadong.zhang/DBlog\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\\\"menu_0\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h2 id=\\\"-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\\\">一、在线用户统计</h2><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\\\"menu_1\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h3 id=\\\"-websocket-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\\\">编写websocket服务端</h3><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">首先，编写websocket服务端。</p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">添加pom依赖</p><p style=\\\"margin-top: 0px; margin-bott', '911', '127.0.0.1', '2018-08-03 19:13:43', '2018-08-03 19:13:43');
INSERT INTO `sys_log` VALUES ('50', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', '{\"blogAuthor\":2,\"blogDesc\":\"WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：\",\"blogHot\":1,\"blogImg\":\"/picture/1381e19a5fe742d6b82dd904741e1231.jpg\",\"blogState\":1,\"blogTop\":1,\"catalogId\":1,\"content\":{\"content\":\"嗷嗷嗷<p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《百度百科》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《<a href=\\\"https://help.aliyun.com/document_detail/63421.html\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">阿里云文档</a>》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\\\"https://gitee.com/yadong.zhang/DBlog\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\\\"menu_0\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h2 id=\\\"-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\\\">一、在线用户统计</h2><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\\\"menu_1\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h3 id=\\\"-websocket-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\\\">编写websocket服务端</h3><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">首先，编写websocket服务端。</p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">添加pom依赖</p><pre><code>&lt;dependency&gt;<br>    &l', '196', '127.0.0.1', '2018-08-03 19:20:56', '2018-08-03 19:20:56');
INSERT INTO `sys_log` VALUES ('51', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', '{\"blogAuthor\":2,\"blogDesc\":\"WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：\",\"blogHot\":1,\"blogImg\":\"/picture/1381e19a5fe742d6b82dd904741e1231.jpg\",\"blogState\":1,\"blogTop\":1,\"catalogId\":1,\"content\":{\"content\":\"<p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《百度百科》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《<a href=\\\"https://help.aliyun.com/document_detail/63421.html\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">阿里云文档</a>》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\\\"https://gitee.com/yadong.zhang/DBlog\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\\\"menu_0\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h2 id=\\\"-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\\\">一、在线用户统计</h2><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\\\"menu_1\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h3 id=\\\"-websocket-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\\\">编写websocket服务端</h3><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">首先，编写websocket服务端。</p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">添加pom依赖</p>\",\"contentId\":1,\"updateDate\":1533295711444', '251', '127.0.0.1', '2018-08-03 19:28:31', '2018-08-03 19:28:31');
INSERT INTO `sys_log` VALUES ('52', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', '{\"blogAuthor\":2,\"blogDesc\":\"WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：\",\"blogHot\":1,\"blogImg\":\"/picture/1381e19a5fe742d6b82dd904741e1231.jpg\",\"blogState\":1,\"blogTop\":1,\"catalogId\":1,\"content\":{\"content\":\"<p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《百度百科》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《<a href=\\\"https://help.aliyun.com/document_detail/63421.html\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">阿里云文档</a>》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\\\"https://gitee.com/yadong.zhang/DBlog\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\\\"menu_0\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h2 id=\\\"-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\\\">一、在线用户统计</h2><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\\\"menu_1\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h3 id=\\\"-websocket-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\\\">编写websocket服务端</h3><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">首先，编写websocket服务端。</p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">添加pom依赖</p><pre><code>import org.springframework.cont', '230', '127.0.0.1', '2018-08-03 19:28:48', '2018-08-03 19:28:48');
INSERT INTO `sys_log` VALUES ('53', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', '{\"blogAuthor\":2,\"blogDesc\":\"WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：\",\"blogHot\":1,\"blogImg\":\"/picture/1381e19a5fe742d6b82dd904741e1231.jpg\",\"blogState\":1,\"blogTop\":1,\"catalogId\":1,\"content\":{\"content\":\"<p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket协议是基于TCP的一种新的网络协议。它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端。该技术的目标是为基于浏览器的、需要和服务器进行双向通信的（服务器不能依赖于打开多个HTTP连接（例如，使用XMLHttpRequest或iframe和长轮询））应用程序提供一种通信机制。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《百度百科》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">WebSocket (WS)是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，能更好地节省服务器资源和带宽并达到实时通讯。WebSocket建立在TCP之上，同HTTP一样通过TCP来传输数据，但是它和HTTP最大不同是：<br>WebSocket是一种双向通信协议，在建立连接后，WebSocket服务器和Browser/Client Agent都能主动的向对方发送或接收数据，就像Socket一样；WebSocket需要类似TCP的客户端和服务器端通过握手连接，连接成功后才能相互通信。<br>WSS（Web Socket Secure）是WebSocket的加密版本。<br><em style=\\\"color: rgb(245, 67, 67); font-weight: 700; font-family: Georgia;\\\">-- 以上节选自《<a href=\\\"https://help.aliyun.com/document_detail/63421.html\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">阿里云文档</a>》 --</em></p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">依据这一原则，我们可以扩展出很多功能，比如：博客在线用户统计、管理员向用户端实时推送消息通知等，本文就针对这两种情况，依照<a href=\\\"https://gitee.com/yadong.zhang/DBlog\\\" style=\\\"background-color: transparent; color: rgb(3, 102, 214);\\\">DBlog开源博客</a>的代码，说明下其具体用法。</p><p><span id=\\\"menu_0\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h2 id=\\\"-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; padding-right: 15px; padding-bottom: 0.3em; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); border-bottom: 1px solid rgb(234, 236, 239); background-color: rgb(255, 255, 255);\\\">一、在线用户统计</h2><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">业务流程：用户访问 --&gt; 链接websocket --&gt; 用户计数+1</p><p><span id=\\\"menu_1\\\" style=\\\"float: left; line-height: 30.4px; margin-top: -5pc; margin-right: -21px; margin-bottom: 10px; padding-top: 5pc; padding-right: 10px; padding-left: 10px; display: inline-block; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\"></span></p><h3 id=\\\"-websocket-\\\" style=\\\"font-family: &quot;Microsoft YaHei&quot;; font-weight: 600; line-height: 1.25; color: rgb(36, 41, 46); margin: 24px -10px 16px; font-size: 1.25em; padding-right: 15px; padding-left: 15px; height: 30px; border-left: 5px solid rgb(101, 211, 45); background-color: rgb(255, 255, 255);\\\">编写websocket服务端</h3><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">首先，编写websocket服务端。</p><p style=\\\"margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;; font-size: 16px; background-color: rgb(255, 255, 255);\\\">添加pom依赖</p><pre><code>import org.springframework.cont', '256', '127.0.0.1', '2018-08-03 19:29:13', '2018-08-03 19:29:13');
INSERT INTO `sys_log` VALUES ('54', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '124', '127.0.0.1', '2018-08-05 12:15:45', '2018-08-05 12:15:45');
INSERT INTO `sys_log` VALUES ('55', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '21536', '127.0.0.1', '2018-08-05 13:00:37', '2018-08-05 13:00:37');
INSERT INTO `sys_log` VALUES ('56', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '16842', '127.0.0.1', '2018-08-05 13:00:37', '2018-08-05 13:00:37');
INSERT INTO `sys_log` VALUES ('57', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '12756', '127.0.0.1', '2018-08-05 13:00:37', '2018-08-05 13:00:37');
INSERT INTO `sys_log` VALUES ('58', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '9834', '127.0.0.1', '2018-08-05 13:00:38', '2018-08-05 13:00:38');
INSERT INTO `sys_log` VALUES ('59', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '60', '127.0.0.1', '2018-08-05 13:01:14', '2018-08-05 13:01:14');
INSERT INTO `sys_log` VALUES ('60', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '57', '127.0.0.1', '2018-08-05 13:01:36', '2018-08-05 13:01:36');
INSERT INTO `sys_log` VALUES ('61', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '210', '127.0.0.1', '2018-08-05 13:03:08', '2018-08-05 13:03:08');
INSERT INTO `sys_log` VALUES ('62', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '108', '127.0.0.1', '2018-08-05 21:42:33', '2018-08-05 21:42:33');
INSERT INTO `sys_log` VALUES ('63', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '208', '127.0.0.1', '2018-08-05 21:43:32', '2018-08-05 21:43:32');
INSERT INTO `sys_log` VALUES ('64', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '90', '127.0.0.1', '2018-08-07 17:34:13', '2018-08-07 17:34:13');
INSERT INTO `sys_log` VALUES ('65', 'unkown', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '119.98.149.65', '2018-08-07 21:25:53', '2018-08-07 21:25:53');
INSERT INTO `sys_log` VALUES ('66', 'unkown', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '119.98.149.65', '2018-08-07 21:26:00', '2018-08-07 21:26:00');
INSERT INTO `sys_log` VALUES ('67', 'unkown', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '16', '119.98.149.65', '2018-08-07 21:26:34', '2018-08-07 21:26:34');
INSERT INTO `sys_log` VALUES ('68', 'unkown', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '16', '119.98.149.65', '2018-08-07 21:29:24', '2018-08-07 21:29:24');
INSERT INTO `sys_log` VALUES ('69', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '78', '119.98.149.65', '2018-08-07 21:30:04', '2018-08-07 21:30:04');
INSERT INTO `sys_log` VALUES ('70', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '31', '119.98.149.65', '2018-08-07 23:37:18', '2018-08-07 23:37:18');
INSERT INTO `sys_log` VALUES ('71', 'javabb', '类型保存', 'cn.javabb.content.controller.admin.CatalogAdminService.save()', null, '15', '119.98.149.65', '2018-08-07 23:43:00', '2018-08-07 23:43:00');
INSERT INTO `sys_log` VALUES ('72', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '31', '119.98.149.65', '2018-08-07 23:48:23', '2018-08-07 23:48:23');
INSERT INTO `sys_log` VALUES ('73', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '153.126.179.145', '2018-08-08 15:21:33', '2018-08-08 15:21:33');
INSERT INTO `sys_log` VALUES ('74', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '106.38.115.23', '2018-08-09 17:15:00', '2018-08-09 17:15:00');
INSERT INTO `sys_log` VALUES ('75', 'javabb', '博客置顶', 'cn.javabb.content.controller.admin.BlogAdminController.updataTop()', null, '47', '106.38.115.23', '2018-08-09 17:15:50', '2018-08-09 17:15:50');
INSERT INTO `sys_log` VALUES ('76', 'javabb', '博客删除', 'cn.javabb.content.controller.admin.BlogAdminController.delete()', null, '78', '106.38.115.23', '2018-08-09 17:16:03', '2018-08-09 17:16:03');
INSERT INTO `sys_log` VALUES ('77', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '16', '117.101.19.196', '2018-08-09 22:36:43', '2018-08-09 22:36:43');
INSERT INTO `sys_log` VALUES ('78', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '149.28.150.9', '2018-08-10 13:57:14', '2018-08-10 13:57:14');
INSERT INTO `sys_log` VALUES ('79', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '53', '127.0.0.1', '2018-08-10 16:55:06', '2018-08-10 16:55:06');
INSERT INTO `sys_log` VALUES ('80', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '102', '127.0.0.1', '2018-08-12 14:27:53', '2018-08-12 14:27:53');
INSERT INTO `sys_log` VALUES ('81', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '115', '127.0.0.1', '2018-08-12 18:32:16', '2018-08-12 18:32:16');
INSERT INTO `sys_log` VALUES ('82', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '302', '127.0.0.1', '2018-08-12 21:12:13', '2018-08-12 21:12:13');
INSERT INTO `sys_log` VALUES ('83', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '71', '127.0.0.1', '2018-08-12 22:07:01', '2018-08-12 22:07:01');
INSERT INTO `sys_log` VALUES ('84', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '75', '127.0.0.1', '2018-08-12 22:37:23', '2018-08-12 22:37:23');
INSERT INTO `sys_log` VALUES ('85', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '78', '127.0.0.1', '2018-08-13 00:00:05', '2018-08-13 00:00:05');
INSERT INTO `sys_log` VALUES ('86', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '73', '127.0.0.1', '2018-08-13 19:41:51', '2018-08-13 19:41:51');
INSERT INTO `sys_log` VALUES ('87', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '64', '127.0.0.1', '2018-08-13 20:42:14', '2018-08-13 20:42:14');
INSERT INTO `sys_log` VALUES ('88', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '56', '127.0.0.1', '2018-08-14 12:24:22', '2018-08-14 12:24:22');
INSERT INTO `sys_log` VALUES ('89', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '382', '127.0.0.1', '2018-08-14 13:46:35', '2018-08-14 13:46:35');
INSERT INTO `sys_log` VALUES ('90', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '113.119.38.200', '2018-08-14 14:48:23', '2018-08-14 14:48:23');
INSERT INTO `sys_log` VALUES ('91', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '365', '127.0.0.1', '2018-08-14 16:04:55', '2018-08-14 16:04:55');
INSERT INTO `sys_log` VALUES ('92', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '342', '127.0.0.1', '2018-08-14 16:49:35', '2018-08-14 16:49:35');
INSERT INTO `sys_log` VALUES ('93', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '54', '127.0.0.1', '2018-08-14 16:52:09', '2018-08-14 16:52:09');
INSERT INTO `sys_log` VALUES ('94', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '59', '127.0.0.1', '2018-08-14 16:52:29', '2018-08-14 16:52:29');
INSERT INTO `sys_log` VALUES ('95', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '144', '127.0.0.1', '2018-08-15 09:08:40', '2018-08-15 09:08:40');
INSERT INTO `sys_log` VALUES ('96', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '77', '127.0.0.1', '2018-08-15 09:08:54', '2018-08-15 09:08:54');
INSERT INTO `sys_log` VALUES ('97', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '61', '127.0.0.1', '2018-08-15 13:41:26', '2018-08-15 13:41:26');
INSERT INTO `sys_log` VALUES ('98', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '67', '127.0.0.1', '2018-08-15 13:41:38', '2018-08-15 13:41:38');
INSERT INTO `sys_log` VALUES ('99', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '53', '127.0.0.1', '2018-08-15 13:47:17', '2018-08-15 13:47:17');
INSERT INTO `sys_log` VALUES ('100', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '360', '127.0.0.1', '2018-08-15 13:54:07', '2018-08-15 13:54:07');
INSERT INTO `sys_log` VALUES ('101', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '59.175.239.251', '2018-08-15 17:20:58', '2018-08-15 17:20:58');
INSERT INTO `sys_log` VALUES ('102', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '186', '127.0.0.1', '2018-08-15 22:17:47', '2018-08-15 22:17:47');
INSERT INTO `sys_log` VALUES ('103', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '64', '127.0.0.1', '2018-08-15 22:18:36', '2018-08-15 22:18:36');
INSERT INTO `sys_log` VALUES ('104', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '61', '127.0.0.1', '2018-08-16 10:33:05', '2018-08-16 10:33:05');
INSERT INTO `sys_log` VALUES ('105', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '736', '127.0.0.1', '2018-08-16 15:11:44', '2018-08-16 15:11:44');
INSERT INTO `sys_log` VALUES ('106', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '70', '127.0.0.1', '2018-08-16 20:04:12', '2018-08-16 20:04:12');
INSERT INTO `sys_log` VALUES ('107', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '351', '127.0.0.1', '2018-08-16 21:06:33', '2018-08-16 21:06:33');
INSERT INTO `sys_log` VALUES ('108', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '800', '127.0.0.1', '2018-08-16 21:08:41', '2018-08-16 21:08:41');
INSERT INTO `sys_log` VALUES ('109', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '111', '127.0.0.1', '2018-08-16 22:23:41', '2018-08-16 22:23:41');
INSERT INTO `sys_log` VALUES ('110', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '525', '127.0.0.1', '2018-08-16 23:05:16', '2018-08-16 23:05:16');
INSERT INTO `sys_log` VALUES ('111', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '89', '127.0.0.1', '2018-08-17 12:11:29', '2018-08-17 12:11:29');
INSERT INTO `sys_log` VALUES ('112', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '399', '127.0.0.1', '2018-08-17 13:17:51', '2018-08-17 13:17:51');
INSERT INTO `sys_log` VALUES ('113', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '802', '127.0.0.1', '2018-08-17 17:23:02', '2018-08-17 17:23:02');
INSERT INTO `sys_log` VALUES ('114', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '304', '127.0.0.1', '2018-08-17 19:52:28', '2018-08-17 19:52:28');
INSERT INTO `sys_log` VALUES ('115', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '544', '127.0.0.1', '2018-08-18 22:30:46', '2018-08-18 22:30:46');
INSERT INTO `sys_log` VALUES ('116', 'javabb', '博客置顶', 'cn.javabb.content.controller.admin.BlogAdminController.updataTop()', null, '51', '127.0.0.1', '2018-08-18 22:45:46', '2018-08-18 22:45:46');
INSERT INTO `sys_log` VALUES ('117', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '59.173.30.116', '2018-08-19 13:10:00', '2018-08-19 13:10:00');
INSERT INTO `sys_log` VALUES ('118', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '71', '127.0.0.1', '2018-08-22 20:09:03', '2018-08-22 20:09:03');
INSERT INTO `sys_log` VALUES ('119', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '120', '127.0.0.1', '2018-08-22 23:22:13', '2018-08-22 23:22:13');
INSERT INTO `sys_log` VALUES ('120', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '56', '127.0.0.1', '2018-08-23 09:12:06', '2018-08-23 09:12:06');
INSERT INTO `sys_log` VALUES ('121', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '53', '127.0.0.1', '2018-08-23 10:31:25', '2018-08-23 10:31:25');
INSERT INTO `sys_log` VALUES ('122', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '371', '127.0.0.1', '2018-08-23 11:19:21', '2018-08-23 11:19:21');
INSERT INTO `sys_log` VALUES ('123', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '3425', '127.0.0.1', '2018-08-23 12:21:14', '2018-08-23 12:21:14');
INSERT INTO `sys_log` VALUES ('124', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '355', '127.0.0.1', '2018-08-23 15:43:29', '2018-08-23 15:43:29');
INSERT INTO `sys_log` VALUES ('125', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '53', '127.0.0.1', '2018-08-24 16:23:42', '2018-08-24 16:23:42');
INSERT INTO `sys_log` VALUES ('126', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '68', '127.0.0.1', '2018-08-24 17:56:23', '2018-08-24 17:56:23');
INSERT INTO `sys_log` VALUES ('127', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '90', '127.0.0.1', '2018-08-26 15:53:56', '2018-08-26 15:53:56');
INSERT INTO `sys_log` VALUES ('128', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '333', '127.0.0.1', '2018-08-26 17:35:01', '2018-08-26 17:35:01');
INSERT INTO `sys_log` VALUES ('129', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '361', '127.0.0.1', '2018-08-26 19:29:33', '2018-08-26 19:29:33');
INSERT INTO `sys_log` VALUES ('130', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '0', '59.175.239.251', '2018-08-29 14:12:46', '2018-08-29 14:12:46');
INSERT INTO `sys_log` VALUES ('131', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '58', '127.0.0.1', '2018-08-29 14:13:41', '2018-08-29 14:13:41');
INSERT INTO `sys_log` VALUES ('132', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '375', '127.0.0.1', '2018-08-29 21:23:43', '2018-08-29 21:23:43');
INSERT INTO `sys_log` VALUES ('133', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '63', '127.0.0.1', '2018-08-29 21:35:46', '2018-08-29 21:35:46');
INSERT INTO `sys_log` VALUES ('134', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '65', '127.0.0.1', '2018-08-29 21:38:06', '2018-08-29 21:38:06');
INSERT INTO `sys_log` VALUES ('135', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '660', '127.0.0.1', '2018-08-29 22:55:51', '2018-08-29 22:55:51');
INSERT INTO `sys_log` VALUES ('136', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '517', '127.0.0.1', '2018-08-29 22:57:03', '2018-08-29 22:57:03');
INSERT INTO `sys_log` VALUES ('137', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '344', '127.0.0.1', '2018-08-29 23:41:55', '2018-08-29 23:41:55');
INSERT INTO `sys_log` VALUES ('138', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '81', '127.0.0.1', '2018-09-01 15:15:50', '2018-09-01 15:15:50');
INSERT INTO `sys_log` VALUES ('139', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '685', '127.0.0.1', '2018-09-01 15:34:33', '2018-09-01 15:34:33');
INSERT INTO `sys_log` VALUES ('140', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '89', '127.0.0.1', '2018-09-01 19:47:51', '2018-09-01 19:47:51');
INSERT INTO `sys_log` VALUES ('141', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '108', '127.0.0.1', '2018-09-01 19:50:03', '2018-09-01 19:50:03');
INSERT INTO `sys_log` VALUES ('142', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '128', '127.0.0.1', '2018-09-01 19:50:35', '2018-09-01 19:50:35');
INSERT INTO `sys_log` VALUES ('143', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '144', '127.0.0.1', '2018-09-01 19:53:23', '2018-09-01 19:53:23');
INSERT INTO `sys_log` VALUES ('144', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '88', '127.0.0.1', '2018-09-02 00:03:04', '2018-09-02 00:03:04');
INSERT INTO `sys_log` VALUES ('145', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '71', '127.0.0.1', '2018-09-02 00:58:26', '2018-09-02 00:58:26');
INSERT INTO `sys_log` VALUES ('146', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '55', '127.0.0.1', '2018-09-03 16:43:54', '2018-09-03 16:43:54');
INSERT INTO `sys_log` VALUES ('147', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '466', '127.0.0.1', '2018-09-03 16:44:43', '2018-09-03 16:44:43');
INSERT INTO `sys_log` VALUES ('148', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '397', '127.0.0.1', '2018-09-03 16:48:29', '2018-09-03 16:48:29');
INSERT INTO `sys_log` VALUES ('149', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '120', '127.0.0.1', '2018-09-03 21:00:28', '2018-09-03 21:00:28');
INSERT INTO `sys_log` VALUES ('150', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '65', '127.0.0.1', '2018-09-03 22:18:22', '2018-09-03 22:18:22');
INSERT INTO `sys_log` VALUES ('151', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '108', '127.0.0.1', '2018-09-06 09:20:02', '2018-09-06 09:20:02');
INSERT INTO `sys_log` VALUES ('152', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '56', '127.0.0.1', '2018-09-06 19:33:23', '2018-09-06 19:33:23');
INSERT INTO `sys_log` VALUES ('153', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '312', '127.0.0.1', '2018-09-07 11:13:45', '2018-09-07 11:13:45');
INSERT INTO `sys_log` VALUES ('154', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '61', '127.0.0.1', '2018-09-07 14:00:44', '2018-09-07 14:00:44');
INSERT INTO `sys_log` VALUES ('155', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '284', '127.0.0.1', '2018-09-07 14:52:20', '2018-09-07 14:52:20');
INSERT INTO `sys_log` VALUES ('156', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '60', '127.0.0.1', '2018-09-08 10:14:22', '2018-09-08 10:14:22');
INSERT INTO `sys_log` VALUES ('157', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '317', '127.0.0.1', '2018-09-08 10:14:47', '2018-09-08 10:14:47');
INSERT INTO `sys_log` VALUES ('158', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '292', '127.0.0.1', '2018-09-08 10:17:16', '2018-09-08 10:17:16');
INSERT INTO `sys_log` VALUES ('159', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '56', '127.0.0.1', '2018-09-08 10:42:51', '2018-09-08 10:42:51');
INSERT INTO `sys_log` VALUES ('160', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '414', '127.0.0.1', '2018-09-08 11:29:40', '2018-09-08 11:29:40');
INSERT INTO `sys_log` VALUES ('161', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '59', '127.0.0.1', '2018-09-08 13:50:01', '2018-09-08 13:50:01');
INSERT INTO `sys_log` VALUES ('162', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '359', '127.0.0.1', '2018-09-08 14:56:45', '2018-09-08 14:56:45');
INSERT INTO `sys_log` VALUES ('163', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '71', '127.0.0.1', '2018-09-08 15:06:13', '2018-09-08 15:06:13');
INSERT INTO `sys_log` VALUES ('164', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '10490', '127.0.0.1', '2018-09-08 20:30:02', '2018-09-08 20:30:02');
INSERT INTO `sys_log` VALUES ('165', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '17277', '127.0.0.1', '2018-09-08 20:30:11', '2018-09-08 20:30:11');
INSERT INTO `sys_log` VALUES ('166', 'javabb', '专题保存', 'cn.javabb.content.controller.admin.SeriesAdminController.save()', null, '109', '127.0.0.1', '2018-09-08 20:41:59', '2018-09-08 20:41:59');
INSERT INTO `sys_log` VALUES ('167', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '154', '59.174.149.97', '2018-09-09 16:20:41', '2018-09-09 16:20:41');
INSERT INTO `sys_log` VALUES ('168', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '96', '59.174.149.97', '2018-09-09 16:45:47', '2018-09-09 16:45:47');
INSERT INTO `sys_log` VALUES ('169', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '76', '127.0.0.1', '2018-09-09 17:29:16', '2018-09-09 17:29:16');
INSERT INTO `sys_log` VALUES ('170', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '99', '59.174.149.97', '2018-09-09 18:26:32', '2018-09-09 18:26:32');
INSERT INTO `sys_log` VALUES ('171', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '99', '59.174.149.97', '2018-09-09 19:31:36', '2018-09-09 19:31:36');
INSERT INTO `sys_log` VALUES ('172', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '64', '127.0.0.1', '2018-09-09 19:38:05', '2018-09-09 19:38:05');
INSERT INTO `sys_log` VALUES ('173', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '69', '127.0.0.1', '2018-09-09 19:48:04', '2018-09-09 19:48:04');
INSERT INTO `sys_log` VALUES ('174', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '103', '59.174.149.97', '2018-09-09 20:04:08', '2018-09-09 20:04:08');
INSERT INTO `sys_log` VALUES ('175', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '94', '59.175.239.251', '2018-09-11 15:14:28', '2018-09-11 15:14:28');
INSERT INTO `sys_log` VALUES ('176', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '62', '127.0.0.1', '2018-09-12 16:36:03', '2018-09-12 16:36:03');
INSERT INTO `sys_log` VALUES ('177', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '104', '58.152.48.101', '2018-09-14 11:42:27', '2018-09-14 11:42:27');
INSERT INTO `sys_log` VALUES ('178', 'javabb', '博客置顶', 'cn.javabb.content.controller.admin.BlogAdminController.updataTop()', null, '56', '58.152.48.101', '2018-09-14 11:45:32', '2018-09-14 11:45:32');
INSERT INTO `sys_log` VALUES ('179', 'javabb', '博客置顶', 'cn.javabb.content.controller.admin.BlogAdminController.updataTop()', null, '52', '58.152.48.101', '2018-09-14 11:45:33', '2018-09-14 11:45:33');
INSERT INTO `sys_log` VALUES ('180', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '72', '127.0.0.1', '2018-09-15 18:31:10', '2018-09-15 18:31:10');
INSERT INTO `sys_log` VALUES ('181', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '152', '171.43.169.153', '2018-09-15 20:20:02', '2018-09-15 20:20:02');
INSERT INTO `sys_log` VALUES ('182', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '141', '171.43.169.153', '2018-09-15 21:28:41', '2018-09-15 21:28:41');
INSERT INTO `sys_log` VALUES ('183', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '144', '127.0.0.1', '2018-09-15 21:42:29', '2018-09-15 21:42:29');
INSERT INTO `sys_log` VALUES ('184', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '73', '127.0.0.1', '2018-09-15 21:49:08', '2018-09-15 21:49:08');
INSERT INTO `sys_log` VALUES ('185', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '95', '127.0.0.1', '2018-09-18 12:33:00', '2018-09-18 12:33:00');
INSERT INTO `sys_log` VALUES ('186', 'javabb', '博客保存', 'cn.javabb.content.controller.admin.BlogAdminController.save()', null, '687', '127.0.0.1', '2018-09-18 12:36:16', '2018-09-18 12:36:16');
INSERT INTO `sys_log` VALUES ('187', 'javabb', '登录', 'cn.javabb.sys.controller.AuthController.toLogin()', null, '104', '127.0.0.1', '2018-09-18 18:38:43', '2018-09-18 18:38:43');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(255) DEFAULT NULL,
  `menu_code` varchar(255) DEFAULT NULL,
  `menu_ico` varchar(255) DEFAULT NULL,
  `menu_desc` varchar(255) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `menu_type` int(255) DEFAULT NULL COMMENT '目录类型，1是前台导航 2是前台普通页面 3 是后台',
  `parent_id` int(255) DEFAULT NULL COMMENT '是否是导航',
  `sort` int(255) DEFAULT NULL COMMENT '排序',
  `state` int(255) DEFAULT NULL COMMENT '0 禁用  1 正常',
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('3', '关于我', 'front/aboutme', 'icon-people', '', '16', '1', null, '4', '1', '2018-09-03 17:09:16', '2018-09-18 18:40:56');
INSERT INTO `sys_menu` VALUES ('4', '博客首页', 'index', 'icon-homepage', '', '17', '1', null, '999', '1', '2018-09-03 21:02:01', '2018-09-03 21:02:01');
INSERT INTO `sys_menu` VALUES ('5', '技术专题', 'series', 'icon-zhuanti', '', '18', '1', null, '998', '1', '2018-09-03 21:03:26', '2018-09-03 21:03:26');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL COMMENT '用户名',
  `nick_name` varchar(20) DEFAULT NULL COMMENT '昵称',
  `user_pwd` varchar(50) DEFAULT NULL COMMENT '加密密码',
  `user_img` varchar(100) DEFAULT NULL COMMENT '头像路径名',
  `user_desc` varchar(500) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `update_date` datetime DEFAULT NULL COMMENT '更新日期',
  `state` int(11) DEFAULT NULL COMMENT '1 正常 0 禁用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'jaychou', '周杰伦', '845ad381452822b5eb3c329284a26c1d', '', '123爱的色放', '2018-06-13 14:58:28', '2018-07-18 00:05:40', '1');
INSERT INTO `sys_user` VALUES ('2', 'javabb', 'javabb', '845ad381452822b5eb3c329284a26c1d', null, null, '2018-05-24 23:12:47', '2018-06-13 15:05:09', '0');
