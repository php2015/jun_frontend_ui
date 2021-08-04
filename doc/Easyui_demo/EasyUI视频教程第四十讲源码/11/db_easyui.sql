/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.1.49-community : Database - db_easyui
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_easyui` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_easyui`;

/*Table structure for table `an_account` */

DROP TABLE IF EXISTS `an_account`;

CREATE TABLE `an_account` (
  `ACCOUNT_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'è´¦ç›®ID',
  `ACCOUNT_BOOK_ID` int(11) NOT NULL COMMENT 'è´¦æœ¬ID',
  `CATEGORY_ID` int(11) NOT NULL DEFAULT '0' COMMENT 'è´¦ç›®åˆ†ç±»ID',
  `ACCOUNT_DATE` date NOT NULL DEFAULT '0000-00-00' COMMENT 'æ”¶æ”¯æ—¥æœŸ',
  `ACCOUNT_TYPE` char(1) NOT NULL DEFAULT '' COMMENT 'æ”¶æ”¯ç±»åž‹',
  `MONEY` double(10,2) NOT NULL DEFAULT '0.00' COMMENT 'æ”¶æ”¯é‡‘é¢',
  `REMARK` varchar(100) DEFAULT NULL COMMENT 'å¤‡æ³¨',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€ 1ï¼šå…¬å¼€ 2ï¼šç§äºº',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`ACCOUNT_ID`),
  KEY `FK_ACCOUNT2BOOK` (`ACCOUNT_BOOK_ID`),
  KEY `FK_ACCOUNT2CATEGORY` (`CATEGORY_ID`),
  CONSTRAINT `FK_ACCOUNT2BOOK` FOREIGN KEY (`ACCOUNT_BOOK_ID`) REFERENCES `an_account_book` (`ACCOUNT_BOOK_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ACCOUNT2CATEGORY` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `an_account_category` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='è´¦ç›®';

/*Data for the table `an_account` */

/*Table structure for table `an_account_book` */

DROP TABLE IF EXISTS `an_account_book`;

CREATE TABLE `an_account_book` (
  `ACCOUNT_BOOK_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'è´¦æœ¬ID',
  `ACCOUNT_BOOK_NAME` varchar(20) NOT NULL DEFAULT '0' COMMENT 'è´¦æœ¬åç§°',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€ 1ï¼šå…¬å¼€ 2ï¼šç§äºº',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`ACCOUNT_BOOK_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='è´¦æœ¬';

/*Data for the table `an_account_book` */

/*Table structure for table `an_account_category` */

DROP TABLE IF EXISTS `an_account_category`;

CREATE TABLE `an_account_category` (
  `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ç›®è´¦åˆ†ç±»ID',
  `CATEGORY_NAME` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç›®è´¦åˆ†ç±»åç§°',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='æ”¶æ”¯é¡¹ç›®';

/*Data for the table `an_account_category` */

/*Table structure for table `an_album` */

DROP TABLE IF EXISTS `an_album`;

CREATE TABLE `an_album` (
  `ALBUM_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ç›¸å†ŒID',
  `ALBUM_NAME` varchar(20) NOT NULL COMMENT 'ç›¸å†Œåç§°',
  `PARENT_ID` int(11) NOT NULL COMMENT 'çˆ¶èŠ‚ç‚¹ID',
  `ISLEAF` char(1) NOT NULL COMMENT 'æ˜¯å¦ä¸ºå¶å­èŠ‚ç‚¹ 0:å¦,1:æ˜¯',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`ALBUM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ç›¸å†Œ';

/*Data for the table `an_album` */

/*Table structure for table `an_document` */

DROP TABLE IF EXISTS `an_document`;

CREATE TABLE `an_document` (
  `DOCUMENT_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'æ–‡æ¡£ID',
  `DOCUMENT_NAME` varchar(255) NOT NULL COMMENT 'æ–‡æ¡£åç§°',
  `LINK` varchar(200) DEFAULT NULL COMMENT 'æ–‡æ¡£é“¾æŽ¥',
  `TYPE` varchar(50) DEFAULT NULL COMMENT 'æ–‡æ¡£ç±»åž‹',
  `SIZE` int(11) DEFAULT NULL COMMENT 'æ–‡æ¡£å¤§å°',
  `TAGS` varchar(255) DEFAULT NULL COMMENT 'æ–‡æ¡£æ ‡ç­¾',
  `PARENT_ID` int(11) NOT NULL COMMENT 'çˆ¶èŠ‚ç‚¹ID',
  `ISLEAF` char(1) NOT NULL COMMENT 'æ˜¯å¦ä¸ºå¶å­èŠ‚ç‚¹ 0:å¦,1:æ˜¯',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`DOCUMENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='æ–‡æ¡£ç®¡ç†';

/*Data for the table `an_document` */

/*Table structure for table `an_feed` */

DROP TABLE IF EXISTS `an_feed`;

CREATE TABLE `an_feed` (
  `FEED_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'è®¢é˜…æºID',
  `FEED_NAME` varchar(255) NOT NULL COMMENT 'è®¢é˜…æºåç§°',
  `FEED_URL` varchar(255) DEFAULT NULL COMMENT 'è®¢é˜…æºURL',
  `FEED_COUNT` int(11) NOT NULL DEFAULT '0',
  `PARENT_ID` int(11) NOT NULL COMMENT 'çˆ¶èŠ‚ç‚¹ID',
  `ISLEAF` char(1) NOT NULL COMMENT 'æ˜¯å¦ä¸ºå¶å­èŠ‚ç‚¹ 0:å¦,1:æ˜¯',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='è®¢é˜…æº';

/*Data for the table `an_feed` */

/*Table structure for table `an_feed_favorite` */

DROP TABLE IF EXISTS `an_feed_favorite`;

CREATE TABLE `an_feed_favorite` (
  `FEED_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'è®¢é˜…ID',
  `TITLE` varchar(200) DEFAULT '' COMMENT 'æ ‡é¢˜',
  `LINK` varchar(200) DEFAULT NULL COMMENT 'é“¾æŽ¥',
  `DESCRIPTION` longtext COMMENT 'æ‘˜è¦',
  `UPDATED` datetime DEFAULT NULL COMMENT 'è®¢é˜…æ—¶é—´',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€ 1ï¼šå…¬å¼€ 2ï¼šç§äºº',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Fag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`FEED_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='è®¢é˜…æ”¶è—';

/*Data for the table `an_feed_favorite` */

/*Table structure for table `an_note` */

DROP TABLE IF EXISTS `an_note`;

CREATE TABLE `an_note` (
  `NOTE_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ç¬”è®°ID',
  `CATEGORY_ID` int(11) NOT NULL DEFAULT '0' COMMENT 'åˆ†ç±»ID',
  `TITLE` varchar(100) NOT NULL DEFAULT '' COMMENT 'æ ‡é¢˜',
  `CONTENT` longtext NOT NULL COMMENT 'å†…å®¹',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€ 1ï¼šå…¬å¼€ 2ï¼šç§äºº',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Fag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`NOTE_ID`),
  KEY `FK_NOTE2CATEGORY` (`CATEGORY_ID`),
  CONSTRAINT `FK_NOTE2CATEGORY` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `an_note_category` (`CATEGORY_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ç¬”è®°';

/*Data for the table `an_note` */

/*Table structure for table `an_note_category` */

DROP TABLE IF EXISTS `an_note_category`;

CREATE TABLE `an_note_category` (
  `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'åˆ†ç±»ID',
  `CATEGORY_NAME` varchar(20) NOT NULL DEFAULT '' COMMENT 'åˆ†ç±»åç§°',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ç¬”è®°åˆ†ç±»';

/*Data for the table `an_note_category` */

/*Table structure for table `an_picture` */

DROP TABLE IF EXISTS `an_picture`;

CREATE TABLE `an_picture` (
  `PICTURE_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'å›¾ç‰‡ID',
  `ALBUM_ID` int(11) NOT NULL COMMENT 'ç›¸å†ŒID',
  `PICTURE_NAME` varchar(255) DEFAULT NULL COMMENT 'å›¾ç‰‡åç§°',
  `TYPE` varchar(10) DEFAULT NULL COMMENT 'å›¾ç‰‡ç±»åž‹',
  `LDATA` longblob COMMENT 'åŽŸå›¾æ•°æ®',
  `LPATH` varchar(100) DEFAULT NULL COMMENT 'åŽŸå›¾è·¯å¾„',
  `SPATH` varchar(100) DEFAULT NULL COMMENT 'ç¼©ç•¥å›¾è·¯å¾„',
  `SDATA` longblob COMMENT 'ç¼©ç•¥å›¾æ•°æ®',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`PICTURE_ID`),
  KEY `FK_Picture2AlbumReference` (`ALBUM_ID`),
  CONSTRAINT `FK_PICTURE2ALBUM` FOREIGN KEY (`ALBUM_ID`) REFERENCES `an_album` (`ALBUM_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='å›¾ç‰‡';

/*Data for the table `an_picture` */

/*Table structure for table `an_todo` */

DROP TABLE IF EXISTS `an_todo`;

CREATE TABLE `an_todo` (
  `TODO_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ä»»åŠ¡ID',
  `CATEGORY_ID` int(11) DEFAULT NULL COMMENT 'ä»»åŠ¡åˆ†ç±»ID',
  `TODO_CONTENT` varchar(500) NOT NULL DEFAULT '' COMMENT 'ä»»åŠ¡å†…å®¹',
  `DEAL_DATE` datetime DEFAULT '0000-00-00 00:00:00' COMMENT 'å¤„ç†æ—¶é—´',
  `LEVEL` char(1) NOT NULL DEFAULT '2' COMMENT 'ä»»åŠ¡ä¼˜å…ˆçº§',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`TODO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ä»»åŠ¡';

/*Data for the table `an_todo` */

/*Table structure for table `an_todo_category` */

DROP TABLE IF EXISTS `an_todo_category`;

CREATE TABLE `an_todo_category` (
  `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'åˆ†ç±»ID',
  `CATEGORY_NAME` varchar(20) NOT NULL DEFAULT '' COMMENT 'åˆ†ç±»åç§°',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT 'çŠ¶æ€',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ä»»åŠ¡åˆ†ç±»';

/*Data for the table `an_todo_category` */

/*Table structure for table `an_user` */

DROP TABLE IF EXISTS `an_user`;

CREATE TABLE `an_user` (
  `USER_ID` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç”¨æˆ·ID',
  `USER_NAME` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç”¨æˆ·å',
  `PASSWORD` varchar(32) NOT NULL DEFAULT '' COMMENT 'å¯†ç ',
  `ROLE` char(1) NOT NULL DEFAULT '1' COMMENT 'æƒé™',
  `SEX` char(1) NOT NULL DEFAULT '1' COMMENT 'æ€§åˆ« 1:ç”· 2:å¥³',
  `BIRTHDAY` date DEFAULT NULL COMMENT 'ç”Ÿæ—¥',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT 'é‚®ç®±',
  `PHONE` varchar(20) DEFAULT NULL COMMENT 'ç”µè¯',
  `STATUS` char(1) NOT NULL DEFAULT '1' COMMENT '1ï¼šå¯ç”¨ 2ï¼šåœç”¨',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ç”¨æˆ·';

/*Data for the table `an_user` */

insert  into `an_user`(`USER_ID`,`USER_NAME`,`PASSWORD`,`ROLE`,`SEX`,`BIRTHDAY`,`EMAIL`,`PHONE`,`STATUS`,`DELFLAG`,`CREATE_USER`,`CREATE_TIME`,`UPDATE_USER`,`UPDATE_TIME`) values ('admin','admin','21232f297a57a5a743894a0e4a801fc3','1','1',NULL,'Anynote@163.com','13770347150','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00');

/*Table structure for table `an_user_meta` */

DROP TABLE IF EXISTS `an_user_meta`;

CREATE TABLE `an_user_meta` (
  `USER_META_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ç”¨æˆ·å…ƒæ•°æ®ID',
  `USER_ID` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç”¨æˆ·ID',
  `META_KEY` varchar(255) NOT NULL DEFAULT '' COMMENT 'å…ƒæ•°æ®KEY',
  `META_VALUE` varchar(255) DEFAULT '' COMMENT 'å…ƒæ•°æ®VALUE',
  `STATUS` char(1) NOT NULL DEFAULT '1',
  `DELFLAG` char(1) NOT NULL DEFAULT '1' COMMENT 'åˆ é™¤Flag 1ï¼šæœªåˆ é™¤ 2ï¼šå·²åˆ é™¤',
  `CREATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'ç™»å½•è€…',
  `CREATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'ç™»å½•æ—¶é—´',
  `UPDATE_USER` varchar(20) NOT NULL DEFAULT '' COMMENT 'æ›´æ–°è€…',
  `UPDATE_TIME` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'æ›´æ–°æ—¶é—´',
  PRIMARY KEY (`USER_META_ID`),
  KEY `FK_USERMETA2USER` (`USER_ID`),
  CONSTRAINT `FK_USERMETA2USER` FOREIGN KEY (`USER_ID`) REFERENCES `an_user` (`USER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='ç”¨æˆ·å…ƒæ•°æ®';

/*Data for the table `an_user_meta` */

insert  into `an_user_meta`(`USER_META_ID`,`USER_ID`,`META_KEY`,`META_VALUE`,`STATUS`,`DELFLAG`,`CREATE_USER`,`CREATE_TIME`,`UPDATE_USER`,`UPDATE_TIME`) values (1,'admin','theme','ext-all.css','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(2,'admin','homePage','/websrc/page/todo/todoList.jsp','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(3,'admin','showNote','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(4,'admin','showTodo','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(5,'admin','showFeed','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(6,'admin','showAccount','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(7,'admin','showPicture','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(8,'admin','showSystem','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00'),(9,'admin','showDocument','on','1','1','admin','2010-07-01 00:00:00','admin','2010-07-01 00:00:00');

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `t_user` */

insert  into `t_user`(`id`,`name`,`phone`,`email`,`qq`) values (1,'张三12233','12345672233','1234567@qq2233.com','12345672233'),(5,'张三52','12345672233','12345672233@qq.com','12345672233'),(7,'张三7','1234567','1234567@qq.com','1234567'),(9,'张三9','1234567','1234567@qq.com','1234567'),(12,'张三12','1234567','1234567@qq.com','1234567'),(13,'张三13','1234567','1234567@qq.com','1234567'),(14,'张三14','1234567','1234567@qq.com','1234567'),(15,'张三15','1234567','1234567@qq.com','1234567'),(16,'d2233','212133','111321@121331.com','212133'),(17,'2444','2121444','12@126444.com','244'),(19,'是3444','2344','21@q33.com','23123333'),(20,'二哥22','12312','231@qq2.com','3213122222'),(21,'1','1','12345672233@qq.com','1'),(23,'211','2121','321@11.com','21');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
