CREATE DATABASE base_rose_web_demo;

USE base_rose_web_demo;

CREATE TABLE `blog` (
  `id` BIGINT(20) NOT NULL auto_increment,
  `title` varchar(100) NOT NULL,
  `content` varchar(200) NOT NULL,
  `is_del` TINYINT(4) NULL DEFAULT 0 COMMENT '是否删除',
  `create_at` BIGINT(20) NULL COMMENT '创建时间',
  `create_by` BIGINT(20) NULL COMMENT '创建者ID',
  `create_name` VARCHAR(45) NULL COMMENT '创建者名称',
  `update_at` BIGINT(20) NULL COMMENT '更新时间',
  `update_by` BIGINT(20) NULL COMMENT '更新者ID',
  `update_name` VARCHAR(45) NULL COMMENT '更新者名称',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='博客';

INSERT INTO `blog` VALUES ('1', 'base-rose-web Demo Title here', 'base-rose-web Demo Content here', 0, 0, 0,'TBR',0, 0,'TBR');
INSERT INTO `blog` VALUES ('2', 'test 1', 'test 1', 0, 0, 0,'TBR',0, 0,'TBR');
INSERT INTO `blog` VALUES ('3', 'test 2', 'test 2', 0, 0, 0,'TBR',0, 0,'TBR');
INSERT INTO `blog` VALUES ('4', 'test 3', 'test 3', 0, 0, 0,'TBR',0, 0,'TBR');
INSERT INTO `blog` VALUES ('5', 'test 4', 'test 4', 0, 0, 0,'TBR',0, 0,'TBR');