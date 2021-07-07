/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : tp32_layuicms

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-09-08 18:41:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lay_article
-- ----------------------------
DROP TABLE IF EXISTS `lay_article`;
CREATE TABLE `lay_article` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `article_name` varchar(200) NOT NULL DEFAULT '' COMMENT '文章名字',
  `art_author` varchar(20) NOT NULL DEFAULT '' COMMENT '作者',
  `abstract` varchar(200) NOT NULL DEFAULT '' COMMENT '摘要',
  `article_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态:0已存草稿，1等待审核，2审核通过',
  `article_img` varchar(255) NOT NULL DEFAULT '' COMMENT '文章封面',
  `article_look` tinyint(4) NOT NULL DEFAULT '0' COMMENT '浏览权限：0开放浏览，1私密浏览',
  `article_top` tinyint(4) NOT NULL DEFAULT '0' COMMENT '文章置顶：0不置顶，1置顶',
  `art_add_time` int(11) NOT NULL DEFAULT '0' COMMENT '发布时间',
  `art_content` text NOT NULL COMMENT '文章内容',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除：0未删除，1已删除',
  PRIMARY KEY (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lay_article
-- ----------------------------
INSERT INTO `lay_article` VALUES ('1', '测试测试测试测试测试测试测试测试11111', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '1', '1', '1970', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('2', 'css3用transition实现边框动画效果2', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '1', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('3', 'css3用transition实现边框动画效果3', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '2', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('4', 'css3用transition实现边框动画效果4', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '1', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('5', 'css3用transition实现边框动画效果5', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '2', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('6', 'css3用transition实现边框动画效果6', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('7', 'css3用transition实现边框动画效果7', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('8', 'css3用transition实现边框动画效果8', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('9', 'css3用transition实现边框动画效果9', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('10', 'css3用transition实现边框动画效果10', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('11', 'css3用transition实现边框动画效果11', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('12', 'css3用transition实现边框动画效果12', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('13', 'css3用transition实现边框动画效果13', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('14', 'css3用transition实现边框动画效果14', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '0', '1488481383', '测试测试测试测试测试测试测试测试', '1');
INSERT INTO `lay_article` VALUES ('15', 'css3用transition实现边框动画效果15', '张三', 'css3用transition实现边框动画效果css3用transition实现边框动画效果', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1488481383', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('21', '华为公司中国区副总裁周建军表示，针对高铁不同场景，华为提出了差异化的解决方案', '张三', '华为公司中国区副总裁周建军表示，针对高铁不同场景，华为提出了差异化的解决方案', '0', '/Public/uploads/images/2019-09-03/5d6e8affc2df5.png', '0', '0', '2019', '&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;&lt;i&gt;&lt;span class=&quot;bjh-strong&quot;&gt;经济观察网 记者 张锐&lt;/span&gt;广深港高铁将在春节前实现境内段全线5G覆盖&lt;/i&gt;。9月3日，记者从中国移动广东分公司获悉，广东移动联合广铁集团、华为公司共同启动广深港高铁5G覆盖工程，宣布将增加施工时间、加派配合人员，用四个月时间完成广深港高铁5G覆盖工程，确保春节前正式开通。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;华为公司中国区副总裁周建军表示，针对高铁不同场景，华为提出了差异化的解决方案应对高铁覆盖新挑战。广东移动称，这一项目将打造全国乃至全球第一条“5G+智慧高铁”，助力粤港澳大湾区发展提速。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;&lt;span class=&quot;bjh-strong&quot;&gt;难度大、时间紧&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;广深港高铁日均开行高铁动车组191对，发送旅客22.9万人，是全国动车组开行密度最大、高铁运营最繁忙的高铁干线之一，从香港西九龙乘坐高铁动车组可在1小时内到达广州、东莞等珠三角城市，拉近了粤港澳大湾区“1小时生活圈”。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;广东移动总经理魏明表示，广东移动正在大力开展5G网络建设和5G应用创新，广深港高铁是粤港澳大湾区重要的交通项目，开通运营以来极大地促进了大湾区的人才和信息流动。未来，将广深港高铁打造成为全国乃至全球第一条5G网络全线覆盖的高铁，将进一步推动粤港澳三地的人才互通、经济互促和文化交流，助力提升粤港澳大湾区的融合发展水平和世界级影响力。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;目前，由于广深港高铁日常车次密度大，铁路部门自身生产任务紧，沿线隧道、车站的5G覆盖施工往往只能在深夜进行，实际可以利用的施工窗口期非常短。同时，高铁覆盖场景多样，建设难度也高于一般区域，比如位于广州市南沙区庆盛站和东莞市虎门站之间的狮子洋隧道长达10.8公里，是目前国内里程最长的水下铁路隧道。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;&lt;span class=&quot;bjh-strong&quot;&gt;华为提出解决方案&lt;/span&gt;&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;广铁集团副总经理蔡培尧认为，5G是“智慧车站”“智慧旅途”的有效载体和高效平台，将有利于铁路全面提升人性化、智能化、自主化的站车一体化服务水平，实现旅客智能引导、智能安全及智慧旅途等功能。广深港高铁是“先行先试、示范引领”的第一条高铁5G线路，未来广铁集团将全力做好协同配合，推动更多线路实现5G全覆盖。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;华为公司中国区副总裁周建军介绍，高铁与5G结合，将会使高铁更加智能化，连接更加高效。针对高铁不同场景，华为提出了差异化的解决方案应对高铁覆盖新挑战，比如针对车速快、小区切换频繁的线路场景，人流密集、容量需求大的站台站厅场景，分场景规划，保障用户体验，打造全球5G高铁标杆。&lt;/span&gt;&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;&lt;span class=&quot;bjh-p&quot;&gt;广东移动表示，为实现广深港高铁5G覆盖，将投入1.5亿元专项资金，在高铁沿线部署超过300个5G信号发射点，依托5G网络，广东移动还将与广铁集团合作探索5G创新应用，打造更多5G服务，为车站管理和铁路运营提供智能指挥调度、安全作业管理等高效支撑服务，让广深港“5G+智慧高铁”成为粤港澳大湾区的一张全新名片。&lt;/span&gt;&lt;/p&gt;', '1');
INSERT INTO `lay_article` VALUES ('19', '21123123', '张三', '213123213', '0', '/Public/uploads/images/2019-09-03/5d6e4126041c4.jpg', '0', '1', '1567506712', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('20', '123123123123123', '张三', '123123123123', '0', '/Public/uploads/images/2019-09-03/5d6e417523882.jpg', '0', '1', '1567506758', '测试测试测试测试测试测试测试测试', '0');
INSERT INTO `lay_article` VALUES ('22', '马上，贵阳到成都只要3小时！888', '张三', '马上，贵阳到成都只要3小时！马上，贵阳到成都只要3小时！', '0', '/Public/uploads/images/2019-09-03/5d6e8c85187b9.jpg', '0', '0', '2019', '&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/p&gt;&lt;h2 style=&quot;text-align: justify;&quot;&gt;马上，贵阳到成都只要3小时！&lt;/h2&gt;', '1');
INSERT INTO `lay_article` VALUES ('23', '园区办召开全体会议传达落实市委十届七次全会精神111', '张三', '园区办召开全体会议传达落实市委十届七次全会精神园区办召开全体会议传达落实市委十届七次全会精神', '0', '/Public/uploads/images/2019-09-03/5d6e8d5042b7a.png', '0', '0', '1567526190', '&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;p style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/p&gt;&lt;h2 style=&quot;text-align: justify;&quot;&gt;园区办召开全体会议传达落实市委十届七次全会精神&lt;/h2&gt;', '0');

-- ----------------------------
-- Table structure for lay_manage
-- ----------------------------
DROP TABLE IF EXISTS `lay_manage`;
CREATE TABLE `lay_manage` (
  `manage_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员主键id',
  `username` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(32) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  `sex` tinyint(4) NOT NULL DEFAULT '0' COMMENT '性别：0女，1男',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0正常，1被封禁',
  `user_add_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `auth` tinyint(4) NOT NULL DEFAULT '1' COMMENT '角色:0超级管理员，1普通管理员',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '删除：0正常，1被删除',
  PRIMARY KEY (`manage_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lay_manage
-- ----------------------------
INSERT INTO `lay_manage` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1', '0', '0', '', '1', '0');
INSERT INTO `lay_manage` VALUES ('2', '张三', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '0', '0', '0', '', '1', '0');
INSERT INTO `lay_manage` VALUES ('3', '李四', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '0', '0', '0', '', '1', '0');
INSERT INTO `lay_manage` VALUES ('7', '令狐冲', 'd41d8cd98f00b204e9800998ecf8427e', '123456@qq.com', '0', '0', '0', '', '1', '1');
INSERT INTO `lay_manage` VALUES ('8', '王重阳', 'd41d8cd98f00b204e9800998ecf8427e', '123456@qq.com', '1', '0', '0', '', '0', '1');
INSERT INTO `lay_manage` VALUES ('9', '古天乐', 'e10adc3949ba59abbe56e057f20f883e', '12345678@qq.com', '0', '0', '1567848594', '修改了', '0', '0');
