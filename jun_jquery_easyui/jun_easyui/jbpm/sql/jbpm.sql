# MySQL-Front 3.2  (Build 14.3)

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='SYSTEM' */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;


# Host: localhost    Database: jbpm
# ------------------------------------------------------
# Server version 5.0.51a-community-nt

#
# Table structure for table t_approves
#

DROP TABLE IF EXISTS `t_approves`;
CREATE TABLE `t_approves` (
  `ID` int(11) NOT NULL auto_increment,
  `T_USER_ID` int(11) default NULL,
  `T_BORROW_ID` int(11) default NULL,
  `RESULT` varchar(20) default NULL,
  `DEMO` varchar(50) default NULL,
  `APP_DATE` varchar(20) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

#
# Dumping data for table t_approves
#


#
# Table structure for table t_borrows
#

DROP TABLE IF EXISTS `t_borrows`;
CREATE TABLE `t_borrows` (
  `ID` int(11) NOT NULL auto_increment,
  `T_USER_ID` varchar(20) default NULL,
  `ITEM` varchar(11) default NULL,
  `MONEYCOUNT` varchar(11) default NULL,
  `DEMO` varchar(50) default NULL,
  `APP_DATE` varchar(20) default NULL,
  `FLAG` varchar(11) default NULL,
  `PROCESS_INSTANCE_ID` int(11) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPRESSED;

#
# Dumping data for table t_borrows
#


#
# Table structure for table t_users
#

DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `ID` int(11) NOT NULL auto_increment,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(11) default NULL,
  `USERTYPE` varchar(11) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPRESSED;

#
# Dumping data for table t_users
#

INSERT INTO `t_users` VALUES (1,'boss','boss','1');
INSERT INTO `t_users` VALUES (2,'manager','manager','2');
INSERT INTO `t_users` VALUES (3,'user','user','3');
INSERT INTO `t_users` VALUES (4,'man','man','2');
INSERT INTO `t_users` VALUES (5,'cw','cw','4');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
