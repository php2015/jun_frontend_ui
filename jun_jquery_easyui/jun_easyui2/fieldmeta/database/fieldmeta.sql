/*
Navicat MySQL Data Transfer

Source Server         : dev
Source Server Version : 50721
Source Host           : 47.98.129.217:3306
Source Database       : fieldmeta

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-06-13 14:15:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fm_field_entity
-- ----------------------------
DROP TABLE IF EXISTS `fm_field_entity`;
CREATE TABLE `fm_field_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  `attr_name` varchar(255) DEFAULT NULL,
  `attr_type` varchar(255) DEFAULT NULL,
  `column_name` varchar(255) DEFAULT NULL,
  `column_sort` decimal(19,2) DEFAULT NULL,
  `column_type` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `decimal_places` bigint(20) DEFAULT NULL,
  `length` bigint(20) DEFAULT NULL,
  `not_insert_restrict` varchar(255) DEFAULT NULL,
  `not_null_restrict` varchar(255) DEFAULT NULL,
  `not_update_restrict` varchar(255) DEFAULT NULL,
  `pk_restrict` varchar(255) DEFAULT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `unique_restrict` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_field_entity
-- ----------------------------
INSERT INTO `fm_field_entity` VALUES ('23', '2018-05-24 22:46:41', '2018-06-11 16:16:32', '', 'javaField2', 'Date', 'java_field2', '1.00', 'datetime', '', null, null, 'yes', 'no', 'no', 'no', 'codefun_option_field', 'no');
INSERT INTO `fm_field_entity` VALUES ('27', '2018-05-24 22:58:43', '2018-06-11 16:16:32', '', 'javaField1', 'String', 'java_field1', '0.00', 'varchar', '', null, null, 'no', 'no', 'no', 'no', 'codefun_option_field', 'no');
INSERT INTO `fm_field_entity` VALUES ('29', '2018-05-25 17:24:20', '2018-06-11 16:16:32', '', 'id', 'Integer', 'id', '2.00', 'bigint', '', null, null, 'no', 'yes', 'no', 'no', 'codefun_option_field', 'no');
INSERT INTO `fm_field_entity` VALUES ('34', '2018-05-29 22:33:29', '2018-05-30 00:18:30', '', '', 'BigDecimal', 'name', '0.00', 'decimal', '', null, '255', 'no', 'no', 'no', 'no', 'test', 'no');
INSERT INTO `fm_field_entity` VALUES ('35', '2018-05-29 22:33:35', '2018-05-29 22:33:35', null, '', '', '2323', '0.00', '', '', null, null, 'no', 'no', 'no', 'no', 'TTT', 'no');
INSERT INTO `fm_field_entity` VALUES ('37', '2018-06-12 16:31:04', '2018-06-13 10:09:36', null, 'aa', 'String', 'aa', '0.00', 'varchar', '', '3', '3', 'no', 'no', 'no', 'yes', 'easyUI', 'no');
INSERT INTO `fm_field_entity` VALUES ('39', '2018-06-12 16:31:06', '2018-06-12 18:53:41', null, 'dd', 'String', 'dd', '1.00', 'varchar', '', '3', '3', 'no', 'no', 'no', 'yes', 'easyUI', 'no');
INSERT INTO `fm_field_entity` VALUES ('45', '2018-06-12 18:53:41', '2018-06-12 18:53:41', null, '1223', 'Date', '1223', '8.00', 'datetime', '', null, null, 'no', 'no', 'no', 'no', 'easyUI', 'no');
INSERT INTO `fm_field_entity` VALUES ('46', '2018-06-13 14:14:12', '2018-06-13 14:14:12', null, 'id', 'Long', 'id', '0.00', 'bigint', '主键', null, '20', 'no', 'no', 'no', 'no', 'org.coderfun.common.BaseEntity', 'no');

-- ----------------------------
-- Table structure for fm_field_page
-- ----------------------------
DROP TABLE IF EXISTS `fm_field_page`;
CREATE TABLE `fm_field_page` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `can_edit` varchar(255) DEFAULT NULL,
  `can_list` varchar(255) DEFAULT NULL,
  `can_query` varchar(255) DEFAULT NULL,
  `code_class` varchar(255) DEFAULT NULL,
  `code_name` varchar(255) DEFAULT NULL,
  `grid_row_col` varchar(255) DEFAULT NULL,
  `need_new_line` varchar(255) DEFAULT NULL,
  `query_type` varchar(255) DEFAULT NULL,
  `required` varchar(255) DEFAULT NULL,
  `entity_field_id` bigint(20) DEFAULT NULL,
  `field_valid` longtext,
  `field_formatter` varchar(255) DEFAULT NULL,
  `field_title` varchar(255) DEFAULT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `form_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsemyad4g5cyqqbx5lclqccg63` (`entity_field_id`),
  CONSTRAINT `FKsemyad4g5cyqqbx5lclqccg63` FOREIGN KEY (`entity_field_id`) REFERENCES `fm_field_entity` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_field_page
-- ----------------------------
INSERT INTO `fm_field_page` VALUES ('23', 'no', 'no', 'no', '', null, '', 'no', '', 'no', '23', '', null, '', 'codefun_option_field', '');
INSERT INTO `fm_field_page` VALUES ('27', 'no', 'no', 'no', '', null, '', 'no', '', 'no', '27', '', null, '', 'codefun_option_field', '');
INSERT INTO `fm_field_page` VALUES ('29', 'no', 'no', 'no', '', null, '', 'no', '', 'no', '29', '', null, '', 'codefun_option_field', '');
INSERT INTO `fm_field_page` VALUES ('34', 'yes', 'yes', 'no', '', null, '6/4/8', 'no', 'CONTAIN', 'no', '34', '', null, '', 'test', null);
INSERT INTO `fm_field_page` VALUES ('35', 'no', 'no', 'no', '', null, '', 'no', '', 'no', '35', '', null, '', 'TTT', null);
INSERT INTO `fm_field_page` VALUES ('37', 'yes', 'yes', 'no', '', null, '6/4/8', 'no', 'CONTAIN', 'no', '37', '', '', '', 'easyUI', '');
INSERT INTO `fm_field_page` VALUES ('39', 'yes', 'yes', 'no', '', null, '6/4/8', 'no', 'CONTAIN', 'no', '39', '', '', '', 'easyUI', '');
INSERT INTO `fm_field_page` VALUES ('45', 'yes', 'yes', 'no', '', null, '6/4/8', 'no', 'CONTAIN', 'no', '45', '', '', '', 'easyUI', '');
INSERT INTO `fm_field_page` VALUES ('46', 'yes', 'yes', 'no', '', null, '6/4/8', 'no', 'CONTAIN', 'no', '46', '', '', '', 'org.coderfun.common.BaseEntity', 'input_hidden');

-- ----------------------------
-- Table structure for fm_fieldmeta
-- ----------------------------
DROP TABLE IF EXISTS `fm_fieldmeta`;
CREATE TABLE `fm_fieldmeta` (
  `id` varchar(64) NOT NULL COMMENT '编号',
  `table_name` varchar(64) NOT NULL COMMENT '表名',
  `column_name` varchar(64) NOT NULL COMMENT '列名',
  `column_sort` decimal(10,0) DEFAULT NULL COMMENT '列排序（升序）',
  `column_type` varchar(100) NOT NULL COMMENT '类型',
  `column_label` varchar(50) DEFAULT NULL COMMENT '列标签名',
  `comments` varchar(500) NOT NULL COMMENT '列备注说明',
  `attr_name` varchar(200) NOT NULL COMMENT '类的属性名',
  `attr_type` varchar(200) NOT NULL COMMENT '类的属性类型',
  `is_pk` char(10) DEFAULT NULL COMMENT '是否主键',
  `not_null` char(10) DEFAULT NULL COMMENT '是否可为空',
  `is_insert` char(10) DEFAULT NULL COMMENT '是否插入字段',
  `is_update` char(10) DEFAULT NULL COMMENT '是否更新字段',
  `is_list` char(10) DEFAULT NULL COMMENT '是否列表字段',
  `is_query` char(10) DEFAULT NULL COMMENT '是否查询字段',
  `query_type` varchar(200) DEFAULT NULL COMMENT '查询方式',
  `is_edit` char(10) DEFAULT NULL COMMENT '是否编辑字段',
  `is_required` char(10) DEFAULT NULL COMMENT '是否必填',
  `show_type` varchar(200) DEFAULT NULL COMMENT '表单类型',
  `grid_row_col` varchar(255) DEFAULT NULL COMMENT '栅格类型',
  `is_new_line` char(10) DEFAULT NULL COMMENT '是否新行',
  `code_class` varchar(255) DEFAULT NULL COMMENT '字典类型',
  `code_name` varchar(255) DEFAULT NULL COMMENT '字典名称',
  `field_valid` text COMMENT '校验规则',
  `options` text COMMENT '其它生成选项',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `remark` text,
  PRIMARY KEY (`id`,`column_name`,`table_name`) USING BTREE,
  UNIQUE KEY `idx_gen_table_column_tn` (`table_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='代码生成表列';

-- ----------------------------
-- Records of fm_fieldmeta
-- ----------------------------

-- ----------------------------
-- Table structure for fm_module
-- ----------------------------
DROP TABLE IF EXISTS `fm_module`;
CREATE TABLE `fm_module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) DEFAULT NULL COMMENT '模块名称',
  `project_id` bigint(20) DEFAULT NULL COMMENT '所属项目',
  `description` varchar(255) DEFAULT NULL COMMENT '模块描述',
  `package_name` varchar(255) DEFAULT NULL COMMENT '模块包名',
  `gen_path` varchar(255) DEFAULT NULL COMMENT '生成路径',
  `copy_right` varchar(255) DEFAULT NULL COMMENT '版权信息',
  `author` varchar(255) DEFAULT NULL COMMENT '作者',
  `remark` text COMMENT '备注信息',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FKnu8xcw16clet0smpu4lsd1tk3` (`project_id`),
  CONSTRAINT `FKnu8xcw16clet0smpu4lsd1tk3` FOREIGN KEY (`project_id`) REFERENCES `fm_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_module
-- ----------------------------
INSERT INTO `fm_module` VALUES ('14', 'test1', '2', null, null, null, null, null, null, '2018-05-15 13:03:41', null);
INSERT INTO `fm_module` VALUES ('18', 'test2', '2', null, '11', 'asd', null, null, null, '2018-05-18 22:23:32', '2018-05-18 22:23:32');
INSERT INTO `fm_module` VALUES ('21', 'test', '10', 'xx', 'test', null, 'xx', 'xx', 'xx', '2018-06-12 16:17:30', '2018-06-12 16:17:30');

-- ----------------------------
-- Table structure for fm_project
-- ----------------------------
DROP TABLE IF EXISTS `fm_project`;
CREATE TABLE `fm_project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `java_template_code` varchar(255) DEFAULT NULL COMMENT 'java模板类型',
  `page_template_code` varchar(255) DEFAULT NULL COMMENT '页面模板类型，codeclass',
  `is_default_code` varchar(255) DEFAULT NULL COMMENT '是否默认，codeclass\r\n',
  `sql_dialect_code` varchar(255) DEFAULT NULL COMMENT '数据库类型，codeclass',
  `db_url` varchar(255) DEFAULT NULL,
  `db_username` varchar(255) DEFAULT NULL,
  `db_password` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_project
-- ----------------------------
INSERT INTO `fm_project` VALUES ('2', 'test', 'ssj', 'easyui', 'no', 'mysql', 'jdbc:MySQL://47.98.129.217:3306/fieldmeta', 'test', 'test', null, null, '2018-06-12 16:16:26');
INSERT INTO `fm_project` VALUES ('10', 'Android', 'ssq', 'easyui', 'yes', 'mysql', 'jdbc:MySQL://47.98.129.217:3306/fieldmeta', 'test', 'test', null, '2018-06-12 16:16:27', '2018-06-12 18:25:57');

-- ----------------------------
-- Table structure for fm_tablemeta
-- ----------------------------
DROP TABLE IF EXISTS `fm_tablemeta`;
CREATE TABLE `fm_tablemeta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) DEFAULT NULL,
  `table_name` varchar(255) DEFAULT NULL COMMENT '表名',
  `entity_name` varchar(255) NOT NULL COMMENT '实体类名称',
  `function_name` varchar(255) DEFAULT NULL,
  `simple_name` varchar(255) DEFAULT NULL COMMENT '生成功能名（简写）',
  `parent_table_name` varchar(64) DEFAULT NULL COMMENT '关联父表的表名',
  `parent_table_fk_name` varchar(64) DEFAULT NULL COMMENT '本表关联父表的外键名',
  `options` text COMMENT '其它生成选项',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  `can_delete` varchar(255) DEFAULT NULL COMMENT '删除功能，code',
  `can_edit` varchar(255) DEFAULT NULL COMMENT '编辑功能，code',
  `entity_super_class` varchar(255) DEFAULT NULL COMMENT '实体基类',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_gen_table_ptn` (`parent_table_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='代码生成表';

-- ----------------------------
-- Records of fm_tablemeta
-- ----------------------------
INSERT INTO `fm_tablemeta` VALUES ('2', 'test2', 'test', '55', null, '阿三', null, null, null, '2018-05-18 22:22:48', '2018-05-31 01:11:02', null, 'yes', 'yes', 'base_entity');
INSERT INTO `fm_tablemeta` VALUES ('3', 'test1', 'TTT', 'ttt', null, '为', 'TT', 'TT', null, '2018-05-29 14:14:45', '2018-05-29 21:01:50', null, null, null, null);
INSERT INTO `fm_tablemeta` VALUES ('4', 'test2', 'FF', 'FF', null, '阿三', null, null, null, '2018-05-29 22:36:14', '2018-05-31 01:05:01', null, 'yes', 'yes', 'order_entity');
INSERT INTO `fm_tablemeta` VALUES ('5', null, 'zlqtable', 'zlqtable', null, '测试', null, null, null, '2018-06-12 16:17:35', '2018-06-12 16:17:35', null, 'yes', 'yes', 'base_entity');
INSERT INTO `fm_tablemeta` VALUES ('6', 'test1', 'qqq', 'qqq', null, '你', null, null, null, '2018-06-12 16:21:37', '2018-06-12 16:21:37', null, 'yes', 'yes', 'base_entity');
INSERT INTO `fm_tablemeta` VALUES ('7', 'test', 'easyUI', 'easyUI', null, '爱的离骚', null, null, null, '2018-06-12 16:29:55', '2018-06-12 16:30:06', '测试', 'yes', 'yes', 'base_entity');

-- ----------------------------
-- Table structure for fm_type_mapping
-- ----------------------------
DROP TABLE IF EXISTS `fm_type_mapping`;
CREATE TABLE `fm_type_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `sql_dialect_code` varchar(255) DEFAULT NULL COMMENT '方言',
  `sql_type` varchar(255) DEFAULT NULL COMMENT 'sql类型',
  `java_type` varchar(255) DEFAULT NULL COMMENT 'java类型',
  `full_java_type` varchar(255) DEFAULT NULL COMMENT 'java全类型',
  `need_join_column_code` varchar(255) DEFAULT NULL COMMENT '是否需要Join Column',
  `remark` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_sql_type` (`sql_type`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_type_mapping
-- ----------------------------
INSERT INTO `fm_type_mapping` VALUES ('1', 'mysql', 'varchar', 'String', 'java.lang.String', 'no', null, '2018-05-18 23:46:18', '2018-05-22 13:40:10');
INSERT INTO `fm_type_mapping` VALUES ('2', 'mysql', 'text', 'String', 'java.lang.String', 'no', null, '2018-05-22 13:41:15', '2018-05-22 13:41:15');
INSERT INTO `fm_type_mapping` VALUES ('3', 'mysql', 'decimal', 'BigDecimal', 'java.math.BigDecimal', 'no', null, '2018-05-22 13:42:12', '2018-05-22 13:42:12');
INSERT INTO `fm_type_mapping` VALUES ('4', 'mysql', 'int', 'Integer', 'java.lang.Integer', 'no', null, '2018-05-22 13:56:32', '2018-05-22 13:56:32');
INSERT INTO `fm_type_mapping` VALUES ('5', 'mysql', 'bigint', 'Long', 'java.lang.long', 'no', null, '2018-05-22 13:57:09', '2018-05-22 13:57:09');
INSERT INTO `fm_type_mapping` VALUES ('6', 'mysql', 'datetime', 'Date', 'java.util.Date', 'no', null, '2018-05-22 13:58:23', '2018-05-22 13:58:23');
INSERT INTO `fm_type_mapping` VALUES ('7', 'mysql', 'date', 'Date', 'java.util.Date', 'no', null, '2018-05-22 13:58:43', '2018-05-22 13:58:43');

-- ----------------------------
-- Table structure for fm_validation
-- ----------------------------
DROP TABLE IF EXISTS `fm_validation`;
CREATE TABLE `fm_validation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `code` varchar(255) NOT NULL COMMENT '代码',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `js_valid` text COMMENT 'js校验正则',
  `java_valid` text COMMENT 'java校验正则',
  `message` varchar(255) DEFAULT NULL COMMENT '校验消息',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fm_validation
-- ----------------------------
INSERT INTO `fm_validation` VALUES ('1', '邮箱', 'tes', 'asdf', 'asdf', 'asdf', 'asdf', '2018-05-18 22:57:57', '2018-05-18 23:03:17', null);

-- ----------------------------
-- Table structure for sys_codeclass
-- ----------------------------
DROP TABLE IF EXISTS `sys_codeclass`;
CREATE TABLE `sys_codeclass` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL COMMENT '代码',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `value` varchar(255) DEFAULT NULL COMMENT '值',
  `module_code` varchar(255) DEFAULT NULL COMMENT '所属模块',
  `is_sys` varchar(255) DEFAULT NULL COMMENT '是否系统内置，0否，1是',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  `order_num` double(11,2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code_class_unique` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_codeclass
-- ----------------------------
INSERT INTO `sys_codeclass` VALUES ('15', 'module_code', '所属模块', null, 'sys', 'yes', '2018-06-13 14:03:25', '2018-06-13 14:03:25', null, null);
INSERT INTO `sys_codeclass` VALUES ('16', 'yes_or_no', '是否', null, 'sys', 'yes', '2018-06-13 14:03:48', '2018-06-13 14:03:48', null, null);
INSERT INTO `sys_codeclass` VALUES ('17', 'sql_dialect_code', '数据库方言', null, 'sys', 'yes', '2018-06-13 14:05:00', '2018-06-13 14:05:00', null, null);
INSERT INTO `sys_codeclass` VALUES ('18', 'entity_super_class', '实体基类', null, 'fieldmeta', 'no', '2018-06-13 14:05:53', '2018-06-13 14:06:01', null, null);
INSERT INTO `sys_codeclass` VALUES ('19', 'form_field_type', '表单类型', null, 'fieldmeta', 'no', '2018-06-13 14:06:31', '2018-06-13 14:06:31', null, null);
INSERT INTO `sys_codeclass` VALUES ('20', 'grid_row_col', '表单栅格', null, 'fieldmeta', 'no', '2018-06-13 14:07:00', '2018-06-13 14:07:00', null, null);
INSERT INTO `sys_codeclass` VALUES ('21', 'java_template_code', 'java模板', null, 'fieldmeta', 'no', '2018-06-13 14:07:24', '2018-06-13 14:07:24', null, null);
INSERT INTO `sys_codeclass` VALUES ('22', 'java_type', 'javaType', null, 'fieldmeta', 'no', '2018-06-13 14:08:43', '2018-06-13 14:09:43', null, null);
INSERT INTO `sys_codeclass` VALUES ('23', 'page_template_code', '页面模板', null, 'fieldmeta', 'no', '2018-06-13 14:09:09', '2018-06-13 14:09:54', null, null);
INSERT INTO `sys_codeclass` VALUES ('24', 'query_type', '查询方式', null, 'fieldmeta', 'no', '2018-06-13 14:09:34', '2018-06-13 14:10:01', null, null);

-- ----------------------------
-- Table structure for sys_codeitem
-- ----------------------------
DROP TABLE IF EXISTS `sys_codeitem`;
CREATE TABLE `sys_codeitem` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_code` varchar(255) NOT NULL COMMENT '所属分类',
  `code` varchar(255) NOT NULL COMMENT '代码',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `value` varchar(255) DEFAULT NULL COMMENT '值',
  `extension` text COMMENT '扩展，json',
  `pinyin` varchar(255) DEFAULT NULL COMMENT '汉语拼音',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  `order_num` double(11,2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_codeitem
-- ----------------------------
INSERT INTO `sys_codeitem` VALUES ('1', 'yes_or_no', 'yes', '是', null, null, null, '2018-05-14 13:44:32', null, null, null);
INSERT INTO `sys_codeitem` VALUES ('2', 'yes_or_no', 'no', '否', null, null, null, '2018-05-14 13:44:32', '2018-05-18 21:57:11', null, null);
INSERT INTO `sys_codeitem` VALUES ('3', 'module_code', 'sys', '系统', null, null, null, '2018-05-14 14:22:03', null, null, null);
INSERT INTO `sys_codeitem` VALUES ('7', 'module_code', 'fieldmeta', '字段元', null, null, null, null, '2018-05-14 21:19:18', null, null);
INSERT INTO `sys_codeitem` VALUES ('12', 'sql_dialect_code', 'mysql', 'mysql', null, null, null, '2018-05-14 21:20:51', null, null, null);
INSERT INTO `sys_codeitem` VALUES ('13', 'entity_super_class', 'base_entity', 'BaseEntity', 'org.coderfun.common.BaseEntity', null, null, '2018-05-21 12:17:51', '2018-05-31 00:43:05', null, '10.00');
INSERT INTO `sys_codeitem` VALUES ('14', 'java_type', 'Long', 'Long', 'java.lang.Long', null, null, '2018-05-21 12:45:00', '2018-05-21 12:45:10', null, null);
INSERT INTO `sys_codeitem` VALUES ('15', 'java_type', 'String', 'String', 'java.lang.String', null, null, '2018-05-21 12:45:52', '2018-05-21 12:45:52', null, null);
INSERT INTO `sys_codeitem` VALUES ('16', 'java_type', 'BigDecimal', 'BigDecimal', 'java.math.BigDecimal', null, null, '2018-05-21 12:46:49', '2018-05-21 12:46:49', null, null);
INSERT INTO `sys_codeitem` VALUES ('17', 'java_type', 'Integer', 'Integer', 'java.lang.Integer', null, null, '2018-05-21 12:47:22', '2018-05-21 12:47:22', null, null);
INSERT INTO `sys_codeitem` VALUES ('18', 'java_type', 'Date', 'Date', 'java.util.Date', null, null, '2018-05-21 12:48:43', '2018-05-21 12:48:43', null, null);
INSERT INTO `sys_codeitem` VALUES ('20', 'query_type', 'EQ', '=', null, null, null, '2018-05-21 13:44:38', '2018-05-21 13:48:38', null, null);
INSERT INTO `sys_codeitem` VALUES ('21', 'query_type', 'CONTAIN', 'contain', null, null, null, '2018-05-21 13:46:58', '2018-05-21 13:51:16', null, null);
INSERT INTO `sys_codeitem` VALUES ('22', 'query_type', 'NE', '!=', null, null, null, '2018-05-21 13:50:13', '2018-05-21 13:50:13', null, null);
INSERT INTO `sys_codeitem` VALUES ('23', 'query_type', 'BETWEEN', 'between', null, null, null, '2018-05-21 13:50:58', '2018-05-21 13:50:58', null, null);
INSERT INTO `sys_codeitem` VALUES ('24', 'grid_row_col', '6/4/8', '6/4/8', null, null, null, '2018-05-25 17:36:32', '2018-05-25 17:36:32', null, null);
INSERT INTO `sys_codeitem` VALUES ('25', 'grid_row_col', '12/2/10', '12/2/10', null, null, null, '2018-05-25 17:37:27', '2018-05-25 17:37:27', null, null);
INSERT INTO `sys_codeitem` VALUES ('26', 'grid_row_col', '12/2/5', '12/2/5', null, null, null, '2018-05-25 17:37:58', '2018-05-25 17:37:58', null, null);
INSERT INTO `sys_codeitem` VALUES ('27', 'grid_row_col', '12/2/8', '12/2/8', null, null, null, '2018-05-25 17:38:09', '2018-05-25 17:38:09', null, null);
INSERT INTO `sys_codeitem` VALUES ('28', 'form_field_type', 'input_hidden', '表单隐藏域', null, null, null, '2018-05-29 23:31:18', '2018-05-29 23:31:18', null, null);
INSERT INTO `sys_codeitem` VALUES ('29', 'form_field_type', 'input_text', '单行文本框', null, null, null, '2018-05-29 23:31:37', '2018-05-29 23:33:20', null, null);
INSERT INTO `sys_codeitem` VALUES ('30', 'form_field_type', 'input_textarea', '多行文本框', null, null, null, '2018-05-29 23:32:37', '2018-05-29 23:32:37', null, null);
INSERT INTO `sys_codeitem` VALUES ('31', 'entity_super_class', 'version_entity', 'VersionEntity', 'org.coderfun.common.VersionEntity', null, null, '2018-05-30 02:03:39', '2018-05-31 00:43:27', null, '8.00');
INSERT INTO `sys_codeitem` VALUES ('32', 'entity_super_class', 'object', '无', 'java.lang.Object', null, null, '2018-05-30 15:09:50', '2018-05-30 15:14:14', '默认不继承其他 实体基类', '1.00');
INSERT INTO `sys_codeitem` VALUES ('33', 'entity_super_class', 'order_entity', 'OrderEntity', 'org.coderfun.common.OrderEntity', null, null, '2018-05-30 16:01:55', '2018-05-31 00:43:19', null, '9.00');
INSERT INTO `sys_codeitem` VALUES ('34', 'java_template_code', 'ssq', 'ssm', null, null, null, '2018-05-31 19:26:44', '2018-06-12 14:48:56', 'spring + springmvc + mybatis', null);
INSERT INTO `sys_codeitem` VALUES ('35', 'java_template_code', 'ssh', 'ssh', null, null, null, '2018-05-31 19:27:41', '2018-05-31 19:27:41', 'spring + springmvc + hibernate', null);
INSERT INTO `sys_codeitem` VALUES ('36', 'java_template_code', 'ssj', 'ssj', null, null, null, '2018-05-31 19:28:03', '2018-05-31 19:33:26', 'spring + springmvc + spring data jpa', '10.00');
INSERT INTO `sys_codeitem` VALUES ('37', 'page_template_code', 'easyui', 'easyui', null, null, null, '2018-05-31 19:30:35', '2018-05-31 19:30:35', null, null);
INSERT INTO `sys_codeitem` VALUES ('38', 'page_template_code', 'bootstrap', 'bootstrap', null, null, null, '2018-05-31 19:31:13', '2018-05-31 19:31:13', null, null);
INSERT INTO `sys_codeitem` VALUES ('39', 'page_template_code', 'layui', 'layui', null, null, null, '2018-05-31 19:31:30', '2018-05-31 19:31:30', null, null);

-- ----------------------------
-- Table structure for sys_menu_tree
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_tree`;
CREATE TABLE `sys_menu_tree` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `parent_node_path` varchar(255) DEFAULT NULL,
  `node_level` int(11) DEFAULT NULL,
  `node_degree` int(11) DEFAULT NULL,
  `node_name` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `remark` text,
  `order_num` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  `iconCls` varchar(255) DEFAULT NULL,
  `perm_code` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu_tree
-- ----------------------------
INSERT INTO `sys_menu_tree` VALUES ('1', null, ',', '1', '2', '14:41:42', '2018-06-09 14:41:43', '2018-06-09 14:42:36', null, '100', null, '2', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('2', '3', ',1,3,', '3', '1', '14:41:43', '2018-06-09 14:41:44', '2018-06-09 15:22:41', null, '100', null, '2', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('3', '1', ',1,', '2', '3', '14:42:33', '2018-06-09 14:42:35', '2018-06-09 15:22:41', null, '100', null, '5', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('4', '1', ',1,', '2', '0', '14:42:36', '2018-06-09 14:42:36', '2018-06-09 14:42:36', null, '200', null, '0', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('5', '2', ',2,', '2', '0', '14:43:12', '2018-06-09 14:43:13', '2018-06-09 15:15:44', null, '100', null, '1', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('6', '3', ',1,3,', '3', '0', '14:43:13', '2018-06-09 14:43:14', '2018-06-11 11:26:53', null, '200', null, '2', null, null, null, null);
INSERT INTO `sys_menu_tree` VALUES ('7', '3', ',1,3,', '3', '0', '14:43:14', '2018-06-09 14:43:15', '2018-06-09 14:43:15', null, '300', null, '0', null, null, null, null);
