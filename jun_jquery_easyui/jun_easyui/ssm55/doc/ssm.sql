/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.1.63-log : Database - ssm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ssm` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ssm`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `account_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(2) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `account` */

insert  into `account`(`account_id`,`status`,`username`,`password`,`salt`,`email`,`role_id`) values (1,2,'abcdef','123132',NULL,NULL,NULL),(2,2,'666','55',NULL,NULL,NULL),(3,3,'3333','3',NULL,NULL,NULL),(4,3,'4444','4',NULL,NULL,NULL),(5,3,'5555','5',NULL,NULL,NULL),(6,3,'6666','6',NULL,NULL,NULL),(7,3,'7777','7',NULL,NULL,NULL),(8,3,'8888','7',NULL,NULL,NULL),(9,3,'9999','7',NULL,NULL,NULL),(11,3,'100000','10',NULL,NULL,NULL);

/*Table structure for table `security_data_control` */

DROP TABLE IF EXISTS `security_data_control`;

CREATE TABLE `security_data_control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `control` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `security_data_control` */

insert  into `security_data_control`(`id`,`control`,`description`,`name`) values (1,'{\"EQ_user.id\":\"#user.id\"}',NULL,'user.id关联的资源');

/*Table structure for table `security_log_entity` */

DROP TABLE IF EXISTS `security_log_entity`;

CREATE TABLE `security_log_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `ip_address` varchar(16) DEFAULT NULL,
  `log_level` varchar(16) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `username` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `security_log_entity` */

/*Table structure for table `security_module` */

DROP TABLE IF EXISTS `security_module`;

CREATE TABLE `security_module` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `priority` int(11) NOT NULL,
  `sn` varchar(32) NOT NULL,
  `url` varchar(255) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `class_name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6510844B953FE581` (`parent_id`),
  CONSTRAINT `FK6510844B953FE581` FOREIGN KEY (`parent_id`) REFERENCES `security_module` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `security_module` */

insert  into `security_module`(`id`,`description`,`name`,`priority`,`sn`,`url`,`parent_id`,`class_name`) values (1,'所有模块的根节点，不能删除。','根模块',1,'Root','#',NULL,NULL),(2,'安全管理:包含权限管理、模块管理等。','安全管理',99,'Security','#',1,NULL),(3,NULL,'用户管理',99,'User','/management/security/user/list',2,NULL),(4,NULL,'角色管理',99,'Role','/management/security/role/list',2,NULL),(5,NULL,'数据权限',99,'DataControl','/management/security/dataControl/list',2,NULL),(6,NULL,'模块管理',99,'Module','/management/security/module/tree_list',2,NULL),(7,NULL,'组织管理',99,'Organization','/management/security/organization/tree_list',2,NULL),(8,NULL,'缓存管理',99,'CacheManage','/management/security/cacheManage/index',2,NULL),(9,NULL,'日志管理',99,'logEntity','/management/security/logEntity/list',2,NULL),(10,NULL,'组件管理',99,'Component','#',1,NULL),(11,'上传系统资源。','资源管理',99,'Resource','/management/component/resource/list',10,NULL),(12,NULL,'打开外部链接',99,'Baidu','http://www.baidu.com',10,NULL),(13,NULL,'系统图标',99,'Icon','/management/component/icon/list',10,NULL),(14,'一个开发使用的简单示例。','开发实例',99,'Sample','#',1,NULL),(15,NULL,'简单任务实例',99,'Task','/management/demo/task/list',14,NULL),(16,'','test',99,'test','#',14,''),(17,'','t2',99,'t2','#',16,'t2');

/*Table structure for table `security_organization` */

DROP TABLE IF EXISTS `security_organization`;

CREATE TABLE `security_organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1DBDA7D2F464A488` (`parent_id`),
  CONSTRAINT `FK1DBDA7D2F464A488` FOREIGN KEY (`parent_id`) REFERENCES `security_organization` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `security_organization` */

insert  into `security_organization`(`id`,`description`,`name`,`parent_id`) values (1,'不能删除。','根组织',NULL),(2,NULL,'泸州电业',1),(3,NULL,'龙马潭供电',2),(4,NULL,'江阳供电',2),(5,NULL,'泸县供电',2),(6,NULL,'纳溪供电',2),(7,NULL,'和益电力',2),(8,NULL,'玉宇电力',2),(9,NULL,'叙永供电',2),(10,NULL,'古蔺供电',2);

/*Table structure for table `security_organization_role` */

DROP TABLE IF EXISTS `security_organization_role`;

CREATE TABLE `security_organization_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL,
  `organization_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK557CA4C3C80E875F` (`organization_id`),
  KEY `FK557CA4C33FFD717F` (`role_id`),
  CONSTRAINT `FK557CA4C33FFD717F` FOREIGN KEY (`role_id`) REFERENCES `security_role` (`id`),
  CONSTRAINT `FK557CA4C3C80E875F` FOREIGN KEY (`organization_id`) REFERENCES `security_organization` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `security_organization_role` */

/*Table structure for table `security_permission` */

DROP TABLE IF EXISTS `security_permission`;

CREATE TABLE `security_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `short_name` varchar(16) NOT NULL,
  `module_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKBA7A9C2EBD56587F` (`module_id`),
  CONSTRAINT `FKBA7A9C2EBD56587F` FOREIGN KEY (`module_id`) REFERENCES `security_module` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

/*Data for the table `security_permission` */

insert  into `security_permission`(`id`,`description`,`name`,`short_name`,`module_id`) values (1,NULL,'看','show',2),(2,NULL,'看','show',3),(3,NULL,'增','save',3),(4,NULL,'删','delete',3),(5,NULL,'查','view',3),(6,NULL,'改','edit',3),(7,'重置密码、更新状态','重置','reset',3),(8,'分配、撤销角色','授权','assign',3),(9,NULL,'看','show',4),(10,NULL,'增','save',4),(11,NULL,'删','delete',4),(12,NULL,'查','view',4),(13,NULL,'改','edit',4),(14,NULL,'授权','assign',4),(15,NULL,'看','show',5),(16,NULL,'增','save',5),(17,NULL,'删','delete',5),(18,NULL,'查','view',5),(19,NULL,'改','edit',5),(20,NULL,'看','show',6),(21,NULL,'增','save',6),(22,NULL,'删','delete',6),(23,NULL,'查','view',6),(24,NULL,'改','edit',6),(25,NULL,'看','show',7),(26,NULL,'增','save',7),(27,NULL,'删','delete',7),(28,NULL,'查','view',7),(29,NULL,'改','edit',7),(30,NULL,'授权','assign',7),(31,NULL,'看','show',8),(32,NULL,'删','delete',8),(33,NULL,'看','show',9),(34,NULL,'删','delete',9),(35,NULL,'查','view',9),(36,NULL,'看','show',10),(37,NULL,'看','show',11),(38,NULL,'增','save',11),(39,NULL,'删','delete',11),(40,NULL,'查','view',11),(41,NULL,'改','edit',11),(42,NULL,'看','show',12),(43,NULL,'看','show',13),(44,NULL,'看','show',14),(45,NULL,'看','show',15),(46,NULL,'增','save',15),(47,NULL,'删','delete',15),(48,NULL,'查','view',15),(49,NULL,'改','edit',15),(50,NULL,'看','show',16),(51,NULL,'增','save',16),(52,NULL,'删','delete',16),(53,NULL,'查','view',16),(54,NULL,'改','edit',16),(55,NULL,'看','show',17),(56,NULL,'删','delete',17);

/*Table structure for table `security_role` */

DROP TABLE IF EXISTS `security_role`;

CREATE TABLE `security_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `security_role` */

insert  into `security_role`(`id`,`description`,`name`) values (1,NULL,'管理员'),(2,NULL,'财务人员'),(3,NULL,'营销人员'),(4,'测试','测试');

/*Table structure for table `security_role_permission` */

DROP TABLE IF EXISTS `security_role_permission`;

CREATE TABLE `security_role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permission_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK679E22392BB04F1F` (`permission_id`),
  KEY `FK679E22393FFD717F` (`role_id`),
  CONSTRAINT `FK679E22392BB04F1F` FOREIGN KEY (`permission_id`) REFERENCES `security_permission` (`id`),
  CONSTRAINT `FK679E22393FFD717F` FOREIGN KEY (`role_id`) REFERENCES `security_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

/*Data for the table `security_role_permission` */

insert  into `security_role_permission`(`id`,`permission_id`,`role_id`) values (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,13,1),(14,14,1),(15,15,1),(16,16,1),(17,17,1),(18,18,1),(19,19,1),(20,20,1),(21,21,1),(22,22,1),(23,23,1),(24,24,1),(25,25,1),(26,26,1),(27,27,1),(28,28,1),(29,29,1),(30,30,1),(31,31,1),(32,32,1),(33,33,1),(34,34,1),(35,35,1),(36,36,1),(37,37,1),(38,38,1),(39,39,1),(40,40,1),(41,41,1),(42,42,1),(43,43,1),(44,44,1),(45,45,1),(46,46,1),(47,47,1),(48,48,1),(49,49,1),(50,1,4),(51,NULL,NULL),(52,NULL,NULL),(53,NULL,NULL),(54,5,4),(55,2,4);

/*Table structure for table `security_role_permission_data_control` */

DROP TABLE IF EXISTS `security_role_permission_data_control`;

CREATE TABLE `security_role_permission_data_control` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_control_id` bigint(20) DEFAULT NULL,
  `role_permission_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKBB731E0E50319A20` (`data_control_id`),
  KEY `FKBB731E0E58F6F1AC` (`role_permission_id`),
  CONSTRAINT `FKBB731E0E50319A20` FOREIGN KEY (`data_control_id`) REFERENCES `security_data_control` (`id`),
  CONSTRAINT `FKBB731E0E58F6F1AC` FOREIGN KEY (`role_permission_id`) REFERENCES `security_role_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `security_role_permission_data_control` */

insert  into `security_role_permission_data_control`(`id`,`data_control_id`,`role_permission_id`) values (2,1,54),(3,1,55);

/*Table structure for table `security_user` */

DROP TABLE IF EXISTS `security_user`;

CREATE TABLE `security_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `realname` varchar(32) NOT NULL,
  `salt` varchar(32) NOT NULL,
  `status` varchar(16) NOT NULL,
  `username` varchar(32) NOT NULL,
  `org_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKD607B56A3CDE9C0E` (`org_id`),
  CONSTRAINT `FKD607B56A3CDE9C0E` FOREIGN KEY (`org_id`) REFERENCES `security_organization` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `security_user` */

insert  into `security_user`(`id`,`create_time`,`email`,`password`,`phone`,`realname`,`salt`,`status`,`username`,`org_id`) values (1,'2012-08-03 14:58:38','ketayao@gmail.com','413389882da8dd535f3da6076c55d8d80b6bcfb7','13518109994','姚强','d6c64a11c75762f5','enabled','admin',2),(2,'2013-12-05 15:52:42',NULL,'a93db582a2cc021f7adfd89b2a0c9c175a509ba5',NULL,'编程土超哥','5f27becbbc663cc2','enabled','manage',2),(3,'2014-01-16 22:30:10','','f16f10a98cbebea6c35bde14e6e9b21d9d2947d5','','test','1ddb30b15b14a57c','enabled','test',3);

/*Table structure for table `security_user_role` */

DROP TABLE IF EXISTS `security_user_role`;

CREATE TABLE `security_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `priority` int(11) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6DD3562B3FFD717F` (`role_id`),
  KEY `FK6DD3562BE528355F` (`user_id`),
  CONSTRAINT `FK6DD3562B3FFD717F` FOREIGN KEY (`role_id`) REFERENCES `security_role` (`id`),
  CONSTRAINT `FK6DD3562BE528355F` FOREIGN KEY (`user_id`) REFERENCES `security_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `security_user_role` */

insert  into `security_user_role`(`id`,`priority`,`role_id`,`user_id`) values (1,99,1,2),(2,99,4,3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
