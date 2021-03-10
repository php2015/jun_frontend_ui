CREATE DATABASE `react_study_mysql` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */


-- we don't know how to generate schema react_study_mysql (class Schema) :(
create table user
(
	id int auto_increment comment 'ID'
		primary key,
	username varchar(40) default '' not null comment '用户名',
	password varchar(255) default '' not null comment '密码',
	type tinyint default '0' not null comment '用户类型 0：牛人 1：boss',
	picture varchar(255) default '' not null comment '头像',
	constraint f_user_username_uindex
		unique (username)
)
;

INSERT INTO react_study_mysql.user (id, username, password, type, picture) VALUES (1, 'user', 'user', 0, '');
INSERT INTO react_study_mysql.user (id, username, password, type, picture) VALUES (2, 'boss', 'boss', 1, '');
INSERT INTO react_study_mysql.user (id, username, password, type, picture) VALUES (3, 'string', 'string', 0, 'string');